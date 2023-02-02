"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Error_1 = require("./components/Basic/Error");
var Cart_1 = require("./components/Cart/Cart");
var FrontPage_1 = require("./components/FrontPage/FrontPage");
var Header_1 = require("./components/Header/Header");
var ProductDetails_1 = require("./components/Products/ProductDetails");
var ProductsList_1 = require("./components/Products/ProductsList");
var LogUser_1 = require("./components/Profile/LogUser");
var Profile_1 = require("./components/Profile/Profile");
var reduxHook_1 = require("./hooks/reduxHook");
var categoryReducer_1 = require("./redux/reducers/categoryReducer");
var productReducer_1 = require("./redux/reducers/productReducer");
var userReducer_1 = require("./redux/reducers/userReducer");
require("./styles/css/index.css");
var App = function () {
    var products = reduxHook_1.useAppSelector(function (state) { return state.productReducer; });
    var user = reduxHook_1.useAppSelector(function (state) { return state.userReducer; });
    var dispatch = reduxHook_1.useAppDispatch();
    // Get all products and categories available from the first page load
    react_1.useEffect(function () {
        dispatch(productReducer_1.fetchAllProducts());
        dispatch(categoryReducer_1.fetchAllCategories());
    }, []);
    react_1.useEffect(function () {
        if (products.length > 0) {
            console.log("products", products);
            dispatch(userReducer_1.makeSpecialOffersForUser(products));
        }
    }, [dispatch, products]);
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(Header_1["default"], null),
            react_1["default"].createElement(react_router_dom_1.Routes, null,
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(FrontPage_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/home", element: react_1["default"].createElement(FrontPage_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/products", element: react_1["default"].createElement(ProductsList_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/products/:category", element: react_1["default"].createElement(ProductsList_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/products/:category/:id", element: react_1["default"].createElement(ProductDetails_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/carts", element: react_1["default"].createElement(Cart_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(LogUser_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile", element: react_1["default"].createElement(Profile_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement(Error_1["default"], null) })))));
};
exports["default"] = App;
