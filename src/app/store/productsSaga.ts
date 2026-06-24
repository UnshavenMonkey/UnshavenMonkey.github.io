import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  ApiError,
  createCategory,
  createProduct,
  getCategories,
  getProducts,
  ProductPayload,
  ProductListResponse,
  ServerProduct,
  updateProduct,
} from '../../shared/api/shop';
import { Product } from '../../shared/data/products';
import { productsActions, ProductFormValues } from './productsSlice';
import { selectProductsPageNumber, selectProductsPageSize, selectToken } from './selectors';

const fallbackImage = 'https://placehold.co/240x180/e5e7eb/1f2937?text=Product';

const getErrorMessage = (error: unknown) => {
  const payload = error instanceof ApiError ? error.payload : error;

  if (payload && typeof payload === 'object' && 'errors' in payload) {
    const errors = (payload as { errors?: Array<{ message?: string; extensions?: { code?: string } }> }).errors;
    return errors?.[0]?.message || 'Сервер вернул ошибку.';
  }

  return 'Не удалось выполнить запрос. Попробуйте позже.';
};

const mapProduct = (product: ServerProduct): Product => ({
  id: product.id,
  price: product.price,
  image: product.photo || fallbackImage,
  category: product.category?.name || 'Без категории',
  categoryId: product.category?.id,
  title: product.name,
  description: product.desc || '',
});

const mapProductPayload = (values: ProductFormValues, categoryId: string): ProductPayload => ({
  name: values.title,
  desc: values.description,
  photo: values.image,
  price: Number(values.price),
  categoryId,
});

function* loadProducts(pageNumber: number, append: boolean) {
  const token: string | null = yield select(selectToken);
  const pageSize: number = yield select(selectProductsPageSize);
  const response: ProductListResponse = yield call(getProducts, pageNumber, pageSize, token);

  yield put(
    productsActions.productsLoaded({
      items: response.data.map(mapProduct),
      pageNumber: response.pagination.pageNumber,
      total: response.pagination.total,
      append,
    })
  );
}

function* handleProductsLoad() {
  try {
    const token: string | null = yield select(selectToken);
    const categories: Awaited<ReturnType<typeof getCategories>> = yield call(getCategories, token);
    yield put(productsActions.categoriesLoaded(categories.data));
    yield call(loadProducts, 1, false);
  } catch (error) {
    yield put(productsActions.productsLoadFailed(getErrorMessage(error)));
  }
}

function* handleNextPageLoad() {
  try {
    const pageNumber: number = yield select(selectProductsPageNumber);
    yield call(loadProducts, pageNumber + 1, true);
  } catch (error) {
    yield put(productsActions.productsLoadFailed(getErrorMessage(error)));
  }
}

function* handleProductSave(action: PayloadAction<{ mode: 'create' | 'edit'; values: ProductFormValues }>) {
  const token: string | null = yield select(selectToken);

  if (!token) {
    yield put(productsActions.productSaveFailed('Для сохранения товара нужно войти.'));
    return;
  }

  try {
    let categoryId = action.payload.values.categoryId;

    if (!categoryId) {
      const category: Awaited<ReturnType<typeof createCategory>> = yield call(
        createCategory,
        token,
        action.payload.values.categoryName || 'Основная категория'
      );
      categoryId = category.id;
    }

    const payload = mapProductPayload(action.payload.values, categoryId);
    const product: ServerProduct =
      action.payload.mode === 'create'
        ? yield call(createProduct, token, payload)
        : yield call(updateProduct, token, action.payload.values.id || '', payload);

    yield put(productsActions.productSaved(mapProduct(product)));
  } catch (error) {
    yield put(productsActions.productSaveFailed(getErrorMessage(error)));
  }
}

export function* productsSaga() {
  yield takeEvery(productsActions.productsLoadRequested.type, handleProductsLoad);
  yield takeEvery(productsActions.productsNextPageRequested.type, handleNextPageLoad);
  yield takeEvery(productsActions.productSaveRequested.type, handleProductSave);
}
