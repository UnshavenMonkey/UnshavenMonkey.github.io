import React, { useState } from 'react';
import { LanguageProvider } from '../providers/LanguageProvider/LanguageProvider';
import { ThemeProvider } from '../providers/ThemeProvider/ThemeProvider';
import { Layout } from '../components/common/Layout/Layout';
import { Modal } from '../components/common/Modal/Modal';
import { OperationShort } from '../components/expenses/OperationShort/OperationShort';
import { OperationFull } from '../components/expenses/OperationFull/OperationFull';
import { CartButton } from '../components/shop/CartButton/CartButton';
import { ProductShort } from '../components/shop/ProductShort/ProductShort';
import { ProductFull } from '../components/shop/ProductFull/ProductFull';
import { CartItem } from '../components/shop/CartItem/CartItem';
import { ProductList } from '../components/shop/ProductList/ProductList';
import './App.css';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Layout>
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

          <section style={{ marginBottom: 40 }}>
            <h2>Магазин — список товаров</h2>
            <ProductList />
          </section>
        </Layout>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
