import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FrontPage from "./components/FrontPage/FrontPage";
import Header from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook";
import { addAll, fetchAllProducts } from "./redux/reducers/productReducer";
import { store } from "./redux/store";

const App = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchAllProducts());
    console.log(store.getState().productReducer)
  }, []);

  return (
    <>
      <Header />
      <FrontPage />
    </>
  );
};

export default App;
