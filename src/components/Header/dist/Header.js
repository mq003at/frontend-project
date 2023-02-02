"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var Banner_1 = require("./Banner");
var HeaderButton_1 = require("./HeaderButton");
var Search_1 = require("@mui/icons-material/Search");
var react_router_dom_1 = require("react-router-dom");
var reduxHook_1 = require("../../hooks/reduxHook");
var cartReducer_1 = require("../../redux/reducers/cartReducer");
var Header = function () {
    var navButtonArray = ['PRODUCTS', 'PROFILE', 'CARTS'];
    var _a = react_1.useState(''), searchTerm = _a[0], setSearchTerm = _a[1];
    var dispatch = reduxHook_1.useAppDispatch();
    var navigate = react_router_dom_1.useNavigate();
    var product = reduxHook_1.useAppSelector(function (state) { return state.productReducer; });
    var handleSearch = function () {
        var result = product.filter(function (product) { return product.title.includes(searchTerm); });
        dispatch(cartReducer_1.extraCart(result));
        dispatch(cartReducer_1.switchCart({ type: "search", extras: searchTerm }));
        navigate("carts");
    };
    var makeNavButton = function (text) {
        return (React.createElement(material_1.Grid, { item: true, xs: 2, key: "navButton-" + text },
            React.createElement(HeaderButton_1["default"], { text: text })));
    };
    var makeSearchNav = function () {
        return (React.createElement(material_1.Grid, { item: true, xs: 4 },
            React.createElement(material_1.Box, { className: "search-bar" },
                React.createElement(material_1.TextField, { variant: "outlined", value: searchTerm, onChange: function (event) { return setSearchTerm(event.target.value); }, InputProps: {
                        startAdornment: React.createElement(material_1.InputAdornment, { position: "start" }, "Search"),
                        endAdornment: (React.createElement(material_1.InputAdornment, { position: "end" },
                            React.createElement(material_1.Button, { onClick: handleSearch },
                                React.createElement(Search_1["default"], null))))
                    } }))));
    };
    return (React.createElement(material_1.AppBar, { position: "fixed" },
        React.createElement(material_1.Grid, { container: true, display: "flex", flexDirection: "row", alignItems: "center", bgcolor: "white" },
            React.createElement(material_1.Grid, { item: true, xs: 14 },
                React.createElement(Banner_1["default"], null)),
            React.createElement(material_1.Grid, { className: "navBar-functionrow", item: true, xs: 14 },
                React.createElement(material_1.Grid, { container: true, alignItems: "center", width: '80%' },
                    makeNavButton('HOME'),
                    makeSearchNav(),
                    navButtonArray.map(function (button) { return makeNavButton(button); }))))));
};
exports["default"] = Header;
