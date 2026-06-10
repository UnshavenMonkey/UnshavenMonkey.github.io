import React, { useState } from 'react';
import { Layout } from '../components/common/Layout/Layout';
import { Modal } from '../components/common/Modal/Modal';
import { OperationShort } from '../components/expenses/OperationShort/OperationShort';
import { OperationFull } from '../components/expenses/OperationFull/OperationFull';
import { CartButton } from '../components/shop/CartButton/CartButton';
import { ProductShort } from '../components/shop/ProductShort/ProductShort';
import { ProductFull } from '../components/shop/ProductFull/ProductFull';
import { CartItem } from '../components/shop/CartItem/CartItem';
import { ProfileForm } from '../components/forms/ProfileForm';
import { ProductForm } from '../components/forms/ProductForm';
import { AuthForm } from '../components/forms/AuthForm';
import './App.css';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Layout>
      <section style={{ marginBottom: 40 }}>
        <h2>Forms</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <ProfileForm
            initialValues={{
              name: 'Jane Cooper',
              about: 'Frontend developer and regular customer.',
            }}
          />
          <ProductForm
            initialValues={{
              title: 'Wireless headphones',
              category: 'Electronics',
              price: '1990',
              image: 'https://placehold.co/360x360',
              description: 'Headphones with active noise cancellation and fast charging.',
            }}
          />
          <AuthForm
            initialMode="register"
            initialValues={{
              email: 'jane@example.com',
              password: 'Password123',
              name: 'Jane Cooper',
              confirmPassword: 'Password123',
            }}
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Modal</h2>
        <button type="button" onClick={() => setModalVisible(true)}>
          Открыть модальное окно
        </button>
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <h3 style={{ margin: '0 0 8px' }}>Пример модального окна</h3>
          <p style={{ margin: 0 }}>Содержимое окна</p>
        </Modal>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Учёт расходов</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 500 }}>
          <OperationShort
            amount={-2500}
            category="Продукты"
            title="Покупка в супермаркете"
            description="Молоко, хлеб, яйца, масло, сыр и другие продукты питания"
          />
          <OperationShort
            amount={85000}
            category="Зарплата"
            title="Зарплата за январь"
            description="Ежемесячная выплата от работодателя"
          />
        </div>
        <div style={{ marginTop: 16, maxWidth: 500 }}>
          <OperationFull
            amount={-2500}
            category="Продукты"
            title="Покупка в супермаркете"
            description="Молоко, хлеб, яйца, масло и другие продукты питания на неделю"
            date="15 января 2025"
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Магазин — CartButton</h2>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 160 }}>
            <CartButton count={0} />
          </div>
          <div style={{ width: 160 }}>
            <CartButton count={3} />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Магазин — ProductShort</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <ProductShort
            price={1990}
            image="https://placehold.co/240x180"
            title="Беспроводные наушники"
            description="Наушники с шумоподавлением и временем работы до 30 часов"
          />
          <ProductShort
            price={4990}
            image="https://placehold.co/240x180"
            title="Механическая клавиатура"
            description="RGB-подсветка, Cherry MX Red переключатели, алюминиевый корпус"
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Магазин — ProductFull</h2>
        <ProductFull
          price={1990}
          image="https://placehold.co/360x360"
          category="Электроника"
          title="Беспроводные наушники Pro"
          description="Наушники с активным шумоподавлением нового поколения. Время работы до 30 часов, быстрая зарядка за 15 минут обеспечивает 3 часа воспроизведения."
        />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Магазин — CartItem</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
          <CartItem price={1990} image="https://placehold.co/64x64" title="Беспроводные наушники Pro" count={2} />
          <CartItem price={4990} image="https://placehold.co/64x64" title="Механическая клавиатура" count={1} />
        </div>
      </section>
    </Layout>
  );
}

export default App;
