import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import '../formStyles.css';

export interface ProductFormValues {
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

interface ProductFormProps {
  initialValues?: ProductFormValues;
  onSubmit?: (values: ProductFormValues) => void;
}

const emptyValues: ProductFormValues = {
  title: '',
  category: '',
  price: '',
  image: '',
  description: '',
};

const getProductErrors = (values: ProductFormValues) => {
  const errors: Partial<Record<keyof ProductFormValues, string>> = {};
  const price = Number(values.price);

  if (values.title.trim().length < 3) {
    errors.title = 'Enter at least 3 characters.';
  }

  if (!values.category.trim()) {
    errors.category = 'Category is required.';
  }

  if (!values.price.trim() || Number.isNaN(price) || price <= 0) {
    errors.price = 'Enter a positive price.';
  }

  if (values.image.trim() && !/^https?:\/\/.+/i.test(values.image.trim())) {
    errors.image = 'Image URL must start with http or https.';
  }

  if (values.description.trim().length < 10) {
    errors.description = 'Enter at least 10 characters.';
  }

  return errors;
};

export const ProductForm: FC<ProductFormProps> = ({ initialValues = emptyValues, onSubmit }) => {
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof ProductFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  }, [initialValues]);

  const errors = getProductErrors(values);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    console.log('Product form submitted:', { ...values, price: Number(values.price) });
    onSubmit?.(values);
    setValues(emptyValues);
    setTouched({});
    setSubmitted(false);
  };

  const shouldShowError = (field: keyof ProductFormValues) => submitted || touched[field];

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h2 className="form-panel__title">Product</h2>
      <div className="form-panel__grid">
        <div className="form-panel__row">
          <label className="form-field">
            <span className="form-field__label">Title</span>
            <input
              className={`form-field__control ${
                shouldShowError('title') && errors.title ? 'form-field__control--invalid' : ''
              }`}
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Wireless headphones"
            />
            <span className="form-field__error">{shouldShowError('title') ? errors.title : ''}</span>
          </label>

          <label className="form-field">
            <span className="form-field__label">Category</span>
            <input
              className={`form-field__control ${
                shouldShowError('category') && errors.category ? 'form-field__control--invalid' : ''
              }`}
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Electronics"
            />
            <span className="form-field__error">{shouldShowError('category') ? errors.category : ''}</span>
          </label>
        </div>

        <div className="form-panel__row">
          <label className="form-field">
            <span className="form-field__label">Price</span>
            <input
              className={`form-field__control ${
                shouldShowError('price') && errors.price ? 'form-field__control--invalid' : ''
              }`}
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="1990"
              inputMode="decimal"
            />
            <span className="form-field__error">{shouldShowError('price') ? errors.price : ''}</span>
          </label>

          <label className="form-field">
            <span className="form-field__label">Image URL</span>
            <input
              className={`form-field__control ${
                shouldShowError('image') && errors.image ? 'form-field__control--invalid' : ''
              }`}
              name="image"
              value={values.image}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://placehold.co/360x360"
            />
            <span className="form-field__error">{shouldShowError('image') ? errors.image : ''}</span>
          </label>
        </div>

        <label className="form-field">
          <span className="form-field__label">Description</span>
          <textarea
            className={`form-field__control form-field__control--textarea ${
              shouldShowError('description') && errors.description ? 'form-field__control--invalid' : ''
            }`}
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe the product"
          />
          <span className="form-field__error">{shouldShowError('description') ? errors.description : ''}</span>
        </label>

        <div className="form-panel__actions">
          <button className="form-panel__button" type="submit">
            Save product
          </button>
        </div>
      </div>
    </form>
  );
};
