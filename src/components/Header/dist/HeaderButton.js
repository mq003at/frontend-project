"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reduxHook_1 = require("../../hooks/reduxHook");
var cartReducer_1 = require("../../redux/reducers/cartReducer");
var HeaderButton = function (props) {
    var navigate = react_router_dom_1.useNavigate();
    var dispatch = reduxHook_1.useAppDispatch();
    react_1.useEffect(function () {
        if (props.text.toLowerCase() === 'carts')
            dispatch(cartReducer_1.switchCart({ type: 'cart', extras: "" }));
    }, [dispatch, props.text]);
    return (React.createElement(material_1.Grid, { item: true, xs: 4 },
        React.createElement(material_1.Button, { variant: "text", onClick: function () { return navigate("" + props.text.toLowerCase()); } }, props.text)));
};
exports["default"] = HeaderButton;
