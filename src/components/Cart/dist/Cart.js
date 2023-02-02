"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var ProductFullDetails_1 = require("../Products/ProductFullDetails");
var reduxHook_1 = require("../../hooks/reduxHook");
var CartFullDetails_1 = require("./CartFullDetails");
var Cart = function () {
    var _a;
    var cart = reduxHook_1.useAppSelector(function (store) { return store.cartReducer; });
    return (react_1["default"].createElement(material_1.Box, { className: "cart__wrapper" },
        cart.type === undefined && cart.cart.length === 0 && react_1["default"].createElement(material_1.Typography, null, "Nothing in here"),
        cart.type === 'search' && (react_1["default"].createElement(material_1.Box, { className: "cart__cardsWrapper" },
            react_1["default"].createElement(material_1.Typography, null, "Search term: " + cart.extras + "."), (_a = cart.cartSearchResult) === null || _a === void 0 ? void 0 :
            _a.map(function (product) { return (react_1["default"].createElement(ProductFullDetails_1["default"], { key: "cart-search-" + product.id, catName: "", product: product })); }))),
        cart.type === 'cart' && (react_1["default"].createElement(material_1.Box, { className: "cart_cardsWrapper" },
            cart.cart.length === 0 && react_1["default"].createElement(material_1.Typography, { className: "cart__noItem" }, "There is no product in your cart. Go to Product and start buying!"),
            cart.cart.map(function (cartProduct) { return (react_1["default"].createElement(CartFullDetails_1["default"], { key: "cart-cart-" + cartProduct.product.id, catName: "", cartProduct: cartProduct })); })))));
};
exports["default"] = Cart;
