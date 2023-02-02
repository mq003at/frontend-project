"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reduxHook_1 = require("../../hooks/reduxHook");
var ProductPlacement_1 = require("../FrontPage/ProductPlacement");
var ProductsList = function () {
    var _a = react_1.useState(true), isAsc = _a[0], revertSort = _a[1];
    var categoryList = reduxHook_1.useAppSelector(function (state) { return state.categoryReducer; });
    var products = reduxHook_1.useAppSelector(function (state) { return state.productReducer; });
    var dispatch = reduxHook_1.useAppDispatch();
    var navigate = react_router_dom_1.useNavigate();
    var params = react_router_dom_1.useParams();
    var currentCat = "";
    if (params)
        currentCat = params;
    var _b = react_1.useState([]), currentProducts = _b[0], setCurrentProducts = _b[1];
    var _c = react_1.useState(-1), chosenCat = _c[0], setChosenCat = _c[1];
    var _d = react_1.useState([10, 100000]), priceRange = _d[0], setPriceRange = _d[1];
    var _e = react_1.useState([]), minMaxPrice = _e[0], setMinMaxPrice = _e[1];
    var _f = react_1.useState(1), currentPage = _f[0], setCurrentPage = _f[1];
    var viewProducts = currentProducts.slice(currentPage * 12 - 12, currentPage * 12);
    // Testing grouping all components into one
    react_1.useEffect(function () {
        var tempArr = [];
        if (currentCat.category && categoryList.length > 0 && products.length > 0) {
            var a_1 = categoryList.find(function (cat) { return cat.name === currentCat.category; });
            if (a_1 === undefined)
                navigate("/error");
            else {
                tempArr = products.filter(function (product) { return product.category.name === a_1.name; });
                if (a_1.id)
                    setChosenCat(a_1.id);
            }
        }
        else if (products.length > 0)
            tempArr = products.map(function (x) { return x; });
        if (tempArr.length > 0) {
            if (isAsc) {
                tempArr.sort(function (a, b) { return (a.price > b.price ? 1 : -1); });
                setMinMaxPrice([tempArr[0].price, tempArr[tempArr.length - 1].price]);
            }
            else {
                tempArr.sort(function (a, b) { return (a.price > b.price ? -1 : 1); });
                setMinMaxPrice([tempArr[0].price, tempArr[tempArr.length - 1].price]);
            }
        }
        setCurrentProducts(tempArr.map(function (x) { return x; }));
    }, [currentCat.category, categoryList, navigate, products, isAsc]);
    react_1.useEffect(function () {
        if (categoryList.length > 0 && products.length > 0 && chosenCat !== -1) {
            setCurrentProducts(products.filter(function (product) { return product.category.id === chosenCat + 1; }));
        }
    }, [categoryList, chosenCat, products]);
    react_1.useEffect(function () {
        setCurrentProducts(function (currentProducts) { return currentProducts.filter(function (product) { return product.price >= priceRange[0] && product.price <= priceRange[1]; }); });
        setCurrentPage(1);
    }, [priceRange]);
    var handleChange = function (event, newValue) {
        setPriceRange(newValue);
    };
    function valuetext(value) {
        return value + " EUR";
    }
    var handleList = function (index) {
        if (index === chosenCat)
            setChosenCat(-1);
        else
            setChosenCat(index);
    };
    var handlePageChange = function (event, pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", { className: "products-page" },
        React.createElement(material_1.Box, { className: "products-page intro" },
            React.createElement(material_1.Card, null,
                React.createElement(material_1.CardContent, null,
                    React.createElement(material_1.Typography, { variant: "h5", component: "div" }, "The Winston Products"),
                    React.createElement(material_1.Typography, { sx: { fontSize: 14 }, component: "div" }, "The best products are available. With personalized birthday gifting option, our products are sure to delight. Make their birthday this year extra spcial - a gift with heart and soul.")))),
        React.createElement(material_1.Box, { className: "products-page products" },
            React.createElement(material_1.Grid, { container: true, spacing: "4em" },
                React.createElement(material_1.Grid, { item: true, xs: 3 },
                    React.createElement(material_1.Box, { textAlign: "left" },
                        React.createElement(material_1.Box, null,
                            React.createElement(material_1.Typography, { variant: "h6", component: "div" }, "Price"),
                            minMaxPrice.length > 0 && React.createElement(material_1.Slider, { getAriaLabel: function () { return "Temperature range"; }, value: priceRange, onChange: handleChange, valueLabelDisplay: "auto", getAriaValueText: valuetext, min: minMaxPrice[0], max: minMaxPrice[1] }),
                            React.createElement(material_1.List, null,
                                React.createElement(material_1.ListItem, { disablePadding: true },
                                    React.createElement(material_1.ListItemButton, { selected: isAsc === true && true, onClick: function () { return revertSort(!isAsc); } },
                                        React.createElement(material_1.ListItemText, { primary: "Ascending" }))),
                                React.createElement(material_1.ListItem, { disablePadding: true },
                                    React.createElement(material_1.ListItemButton, { selected: isAsc === false && true, onClick: function () { return revertSort(!isAsc); } },
                                        React.createElement(material_1.ListItemText, { primary: "Descending" }))))),
                        React.createElement(material_1.Box, null,
                            React.createElement(material_1.Typography, { variant: "h6", component: "div" }, "Category"),
                            React.createElement(material_1.List, null, categoryList.map(function (category, index) { return (React.createElement(material_1.ListItem, { key: "list-" + category.id, disablePadding: true },
                                React.createElement(material_1.ListItemButton, { selected: chosenCat === index && true, onClick: function () { return handleList(index); } },
                                    React.createElement(material_1.ListItemText, { primary: category.name })))); }))))),
                React.createElement(material_1.Grid, { item: true, xs: 9 },
                    React.createElement(material_1.Box, { textAlign: "left" },
                        React.createElement(material_1.Typography, { variant: "h6", component: "div" }, "Products")),
                    React.createElement(material_1.Box, { sx: { display: "flex", flexWrap: "wrap", p: 1, m: 1, bgcolor: "background.paper", borderRadius: 1 } },
                        viewProducts.map(function (product) { return (React.createElement(ProductPlacement_1["default"], { key: "productLis-" + product.id, size: 50, product: product, isOnSale: false, isHideDescription: true })); }),
                        React.createElement(material_1.Pagination, { count: Math.ceil(currentProducts.length / 12), page: currentPage, variant: "outlined", onChange: handlePageChange, shape: "rounded", size: "large" })))))));
};
exports["default"] = ProductsList;
