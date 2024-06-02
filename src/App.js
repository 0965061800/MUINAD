import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Product';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import User from './pages/User';
import Category from './pages/Category';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';
import ProductCreate from './pages/ProductCreate';
import Order from './pages/Order';
import OrderDetail from './pages/OrderDetail';
import UserDetail from './pages/UserDetail';

function App() {
  const [loading, setLoading] = useState(true);
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <PageTitle title="User | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <User />
            </>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <>
              <PageTitle title="User | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UserDetail />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Category />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Product />
            </>
          }
        />
         <Route
          path="/product"
          element={
            <>
              <PageTitle title="Products | MuIn" />
              <Product />
            </>
          }
        />
         <Route
          path="/products/:productId"
          element={
            <>
              <PageTitle title="Product Detail | MuIn" />
              <ProductDetail />
            </>
          }
        />
         <Route
          path="/products/edit/:productId"
          element={
            <>
              <PageTitle title="Product Edit | MuIn" />
              <ProductEdit />
            </>
          }
        />
        <Route
          path="/create-product"
          element={
            <>
              <PageTitle title="Product Edit | MuIn" />
              <ProductCreate />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <PageTitle title="Order | MuIn" />
              <Order />
            </>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <>
              <PageTitle title="Order Detail | MuIn" />
              <OrderDetail />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
