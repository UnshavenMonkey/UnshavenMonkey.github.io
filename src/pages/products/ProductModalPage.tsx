import React, { ChangeEvent, Component, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsActions, ProductFormValues } from '../../app/store/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  selectProductCategories,
  selectProductSaveError,
  selectProductSaving,
  selectProducts,
} from '../../app/store/selectors';
import { Modal } from '../../components/common/Modal/Modal';
import { ProductsPage } from './ProductsPage';
import './ProductModalPage.css';

interface ProductModalRouteProps {
  mode: 'create' | 'edit';
}

interface ProductModalProps extends ProductModalRouteProps {
  products: ReturnType<typeof selectProducts>;
  categories: ReturnType<typeof selectProductCategories>;
  saving: boolean;
  saveError: string | null;
  navigate: (to: string) => void;
  onSave: (mode: 'create' | 'edit', values: ProductFormValues) => void;
  productId?: string;
}

class ProductModal extends Component<ProductModalProps, ProductFormValues> {
  state: ProductFormValues = this.getInitialState();

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(previousProps: ProductModalProps) {
    if (previousProps.saving && !this.props.saving && !this.props.saveError) {
      this.closeModal();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  getInitialState(): ProductFormValues {
    const product = this.props.products.find((item) => item.id === this.props.productId);

    if (product) {
      return {
        id: product.id,
        title: product.title,
        categoryId: product.categoryId || '',
        categoryName: product.category,
        price: String(product.price),
        image: product.image,
        description: product.description,
      };
    }

    return {
      title: '',
      categoryId: this.props.categories[0]?.id || '',
      categoryName: '',
      price: '',
      image: 'https://placehold.co/240x180/e5e7eb/1f2937?text=New',
      description: '',
    };
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<ProductFormValues, keyof ProductFormValues>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSave(this.props.mode, this.state);
  };

  closeModal = () => {
    this.props.navigate('/products');
  };

  render() {
    const { title, categoryId, price, image, description } = this.state;
    const titleText = this.props.mode === 'create' ? 'Новый товар' : 'Редактирование товара';

    return (
      <>
        <ProductsPage />
        <Modal visible onClose={this.closeModal}>
          <form className="product-modal-form" onSubmit={this.handleSubmit}>
            <h2>{titleText}</h2>
            <label className="field">
              <span>Название</span>
              <input name="title" value={title} onChange={this.handleChange} />
            </label>
            <label className="field">
              <span>Категория</span>
              <select name="categoryId" value={categoryId} onChange={this.handleChange}>
                <option value="">Выберите категорию</option>
                {this.props.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Новая категория</span>
              <input
                name="categoryName"
                value={this.state.categoryName}
                onChange={this.handleChange}
                placeholder="Заполните, если категории нет в списке"
              />
            </label>
            <label className="field">
              <span>Цена</span>
              <input name="price" type="number" min="1" value={price} onChange={this.handleChange} />
            </label>
            <label className="field">
              <span>Изображение</span>
              <input name="image" value={image} onChange={this.handleChange} />
            </label>
            <label className="field">
              <span>Описание</span>
              <textarea name="description" rows={3} value={description} onChange={this.handleChange} />
            </label>
            {this.props.saveError && <p className="product-modal-form__error">{this.props.saveError}</p>}
            <div className="product-modal-form__actions">
              <button className="primary-button" disabled={this.props.saving} type="submit">
                {this.props.saving ? 'Сохраняем...' : 'Сохранить'}
              </button>
              <button className="secondary-button" type="button" onClick={this.closeModal}>
                Отмена
              </button>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

export const ProductModalPage = (props: ProductModalRouteProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectProductCategories);
  const saving = useAppSelector(selectProductSaving);
  const saveError = useAppSelector(selectProductSaveError);

  return (
    <ProductModal
      {...props}
      products={products}
      categories={categories}
      saving={saving}
      saveError={saveError}
      navigate={navigate}
      onSave={(mode, values) => dispatch(productsActions.productSaveRequested({ mode, values }))}
      productId={productId}
    />
  );
};
