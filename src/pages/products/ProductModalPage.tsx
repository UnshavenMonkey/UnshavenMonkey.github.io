import React, { ChangeEvent, Component, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../components/common/Modal/Modal';
import { Product } from '../../shared/data/products';
import { ProductsPage } from './ProductsPage';
import './ProductModalPage.css';

interface ProductModalRouteProps {
  products: Product[];
  mode: 'create' | 'edit';
  onSave: (product: Product) => void;
}

interface ProductModalProps extends ProductModalRouteProps {
  navigate: (to: string) => void;
  productId?: string;
}

interface ProductModalState {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

class ProductModal extends Component<ProductModalProps, ProductModalState> {
  state: ProductModalState = this.getInitialState();

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  getInitialState(): ProductModalState {
    const product = this.props.products.find((item) => item.id === this.props.productId);

    if (product) {
      return {
        id: product.id,
        title: product.title,
        category: product.category,
        price: String(product.price),
        image: product.image,
        description: product.description,
      };
    }

    return {
      id: '',
      title: '',
      category: '',
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

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<ProductModalState, keyof ProductModalState>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id, title, category, price, image, description } = this.state;

    this.props.onSave({
      id: id || title.trim().toLowerCase().replace(/\s+/g, '-'),
      title,
      category,
      price: Number(price),
      image,
      description,
    });
    this.closeModal();
  };

  closeModal = () => {
    this.props.navigate('/products');
  };

  render() {
    const { id, title, category, price, image, description } = this.state;
    const titleText = this.props.mode === 'create' ? 'Новый товар' : 'Редактирование товара';

    return (
      <>
        <ProductsPage products={this.props.products} />
        <Modal visible onClose={this.closeModal}>
          <form className="product-modal-form" onSubmit={this.handleSubmit}>
            <h2>{titleText}</h2>
            <label className="field">
              <span>Идентификатор</span>
              <input name="id" value={id} onChange={this.handleChange} placeholder="smart-watch" />
            </label>
            <label className="field">
              <span>Название</span>
              <input name="title" value={title} onChange={this.handleChange} required />
            </label>
            <label className="field">
              <span>Категория</span>
              <input name="category" value={category} onChange={this.handleChange} required />
            </label>
            <label className="field">
              <span>Цена</span>
              <input name="price" type="number" min="1" value={price} onChange={this.handleChange} required />
            </label>
            <label className="field">
              <span>Изображение</span>
              <input name="image" value={image} onChange={this.handleChange} required />
            </label>
            <label className="field">
              <span>Описание</span>
              <textarea name="description" rows={3} value={description} onChange={this.handleChange} required />
            </label>
            <div className="product-modal-form__actions">
              <button className="primary-button" type="submit">
                Сохранить
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
  const navigate = useNavigate();
  const { productId } = useParams();

  return <ProductModal {...props} navigate={navigate} productId={productId} />;
};
