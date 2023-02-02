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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
exports.__esModule = true;
exports.switchCart = exports.extraCart = exports.updateCart = exports.cartReducer = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var cartSlice = toolkit_1.createSlice({
    name: 'cartSlice',
    initialState: { cart: [] },
    reducers: {
        // Change product quantity and if the quantity exceeds the current in the cart, remove it. It can also be used to add more Product into the cart
        updateCart: function (state, action) {
            var _a = action.payload, product = _a.product, quantity = _a.quantity;
            var existingCart = state.cart.find(function (item) { return item.product.id === product.id; });
            if (existingCart) {
                if (quantity === 0) {
                    var newCart = state.cart.filter(function (item) { return item.product.id !== product.id; });
                    return __assign(__assign({}, state), { cart: newCart });
                }
                else {
                    return __assign(__assign({}, state), { cart: state.cart.map(function (item) { return (item.product.id === product.id ? __assign(__assign({}, item), { quantity: quantity }) : item); }) });
                }
            }
            else
                return __assign(__assign({}, state), { cart: __spreadArrays(state.cart, [{ product: product, quantity: quantity }]) });
        },
        // Return the search product
        extraCart: function (state, action) {
            console.log('reach', action.payload);
            return __assign(__assign({}, state), { cartSearchResult: action.payload });
        },
        // Switch functionality
        switchCart: function (state, action) {
            return __assign(__assign({}, state), { type: action.payload.type, extras: action.payload });
        }
    }
});
exports.cartReducer = cartSlice.reducer;
exports.updateCart = (_a = cartSlice.actions, _a.updateCart), exports.extraCart = _a.extraCart, exports.switchCart = _a.switchCart;
