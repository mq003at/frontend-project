import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Error from "./components/Basic/Error";
import AdminSettings from "./components/Cart/AdminSettings";
import Cart from "./components/Cart/Cart";
import FrontPage from "./components/FrontPage/FrontPage";
import Header from "./components/Header/Header";
import ProductDetail from "./components/Products/ProductDetails";
import ProductsList from "./components/Products/ProductsList";
import LogUser from "./components/Profile/LogUser";
import Profile from "./components/Profile/Profile";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook";
import { fetchAllCategories } from "./redux/reducers/categoryReducer";
import { addAll, fetchAllProducts, sortAllByPrice } from "./redux/reducers/productReducer";
import { makeSpecialOffersForUser } from "./redux/reducers/userReducer";
import { store } from "./redux/store";

import "./styles/css/index.css";

const App = () => {
  const products = useAppSelector((state) => state.productReducer);
  const user = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch();

  // Get all products and categories available from the first page load
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      console.log(products);
      dispatch(makeSpecialOffersForUser(products));
    }
  }, [dispatch, products]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<FrontPage />} />          
          <Route path={"/home"} element={<FrontPage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:category" element={<ProductsList />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/profile" element={user.currentUser ? <Profile currentUser={user.currentUser} /> : <LogUser/>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
