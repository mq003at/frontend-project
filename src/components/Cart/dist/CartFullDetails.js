"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_slick_1 = require("react-slick");
var reduxHook_1 = require("../../hooks/reduxHook");
var cartReducer_1 = require("../../redux/reducers/cartReducer");
var Done_1 = require("@mui/icons-material/Done");
var CardFullDetails = function (props) {
    var catName = props.catName, cartProduct = props.cartProduct;
    var _a = react_1.useState(cartProduct.quantity), value = _a[0], setValue = _a[1];
    var cart = reduxHook_1.useAppSelector(function (store) { return store.cartReducer; });
    var dispatch = reduxHook_1.useAppDispatch();
    var handleIncrease = function () {
        setValue(value + 1);
    };
    var handleDecrease = function () {
        if (value > 0)
            setValue(value - 1);
    };
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
    };
    function handleButton() {
        dispatch(cartReducer_1.updateCart({ product: cartProduct.product, quantity: value }));
    }
    return (React.createElement(material_1.Card, { className: "product-f-details wrapper" },
        React.createElement(material_1.Box, { className: "product-f-details show-cat", textAlign: "left" },
            React.createElement(material_1.Typography, { marginLeft: "1.25em", padding: "0.5em 0.5em", color: "text.secondary" },
                ">",
                " ",
                cartProduct.product.category.name)),
        React.createElement(material_1.Grid, { container: true },
            React.createElement(material_1.Grid, { item: true, xs: 4 },
                React.createElement(material_1.Box, { paddingBottom: "2em", paddingLeft: "1em", paddingRight: "1em" },
                    React.createElement(react_slick_1["default"], __assign({}, settings), cartProduct.product.images.map(function (image) { return (React.createElement("div", { className: "product-f-details-imgwrapper", key: "fullDetail-" + image },
                        React.createElement("img", { src: image, alt: cartProduct.product.title }))); })))),
            React.createElement(material_1.Grid, { item: true, xs: 8 },
                React.createElement(material_1.Box, { className: "product-f-details mainInfo", textAlign: "left" },
                    React.createElement(material_1.Typography, { className: "product-f-details title" }, cartProduct.product.title),
                    React.createElement(material_1.Typography, { className: "product-f-details price" },
                        cartProduct.product.price,
                        " EUR.")),
                React.createElement(material_1.Box, { className: "product-f-details buyout-container" },
                    React.createElement(material_1.Box, { className: "product-f-details incBox", textAlign: "left" },
                        React.createElement(material_1.Button, { onClick: handleDecrease }, "-"),
                        React.createElement(material_1.TextField, { className: "product-f-details incInput", variant: "outlined", value: value, type: "nummber", InputLabelProps: {
                                shrink: true
                            }, disabled: true }),
                        React.createElement(material_1.Button, { onClick: handleIncrease }, "+")),
                    React.createElement(material_1.Button, { className: "product-f-details shopIcon", onClick: function () { return handleButton(); } },
                        React.createElement(Done_1["default"], null))),
                React.createElement(material_1.Box, null,
                    React.createElement(material_1.Typography, { variant: "subtitle1", textAlign: "left" }, cartProduct.product.description))))));
};
exports["default"] = CardFullDetails;
