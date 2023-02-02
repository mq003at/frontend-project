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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.sortAllByPrice = exports.sortAllByCategory = exports.findProduct = exports.addAll = exports.productReducer = exports.addProductAndImage = exports.deleteProduct = exports.modifyProduct = exports.addProductToServer = exports.fetchAllProducts = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var sharedInstance_1 = require("../../test/shared/sharedInstance");
// Fetch all products from API; in case the fetch fails, use the backup one stored locally
exports.fetchAllProducts = toolkit_1.createAsyncThunk('fetchAllProducts', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].get('products')];
            case 1:
                res = _a.sent();
                // const fetchRes = await fetch("/assets/products.json"); //Backup when fakeapi's data changes
                // const res = await fetchRes.json();
                // return { data: res.data, status: res.request.status };
                if (!(res.data instanceof Error))
                    return [2 /*return*/, { data: res.data, status: 200 }];
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                throw new Error(e_1.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.addProductToServer = toolkit_1.createAsyncThunk('addProductToServer', function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].post('products', product)];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error))
                    return [2 /*return*/, res.data];
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log('adderr', e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Take in an updated Product, generate metadata and update it on the server
exports.modifyProduct = toolkit_1.createAsyncThunk('modifyProduct', function (_a) {
    var id = _a.id, update = _a.update;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sharedInstance_1["default"].put("/products/" + id, update)];
                case 1:
                    res = _b.sent();
                    if (!(res.data instanceof Error) && res.data !== undefined)
                        return [2 /*return*/, res.data];
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    console.log('upderr', e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.deleteProduct = toolkit_1.createAsyncThunk('deleteProduct', function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"]["delete"]("/products/" + id)];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error))
                    return [2 /*return*/, { id: id, status: res.status, message: res.data }];
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log('delerr', e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Accept an array images and push them into the API.
exports.addProductAndImage = toolkit_1.createAsyncThunk('addProductAndImage', function (_a) {
    var imageArray = _a.imageArray, product = _a.product;
    return __awaiter(void 0, void 0, void 0, function () {
        var images, _i, imageArray_1, img, response, res2, e_5, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    images = [];
                    _i = 0, imageArray_1 = imageArray;
                    _b.label = 1;
                case 1:
                    if (!(_i < imageArray_1.length)) return [3 /*break*/, 4];
                    img = imageArray_1[_i];
                    return [4 /*yield*/, sharedInstance_1["default"].post('/files/upload', img)];
                case 2:
                    response = _b.sent();
                    if (!(response.data instanceof Error) && response.data.location)
                        images.push(response.data.location);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(images.length <= 0)) return [3 /*break*/, 5];
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, sharedInstance_1["default"].post('products', __assign(__assign({}, product), { images: images }))];
                case 6:
                    res2 = _b.sent();
                    return [2 /*return*/, res2.data];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_5 = _b.sent();
                    error = e_5;
                    if (error.request)
                        console.log('addproductwimage-err-request', error.request.data);
                    else if (error.response)
                        console.log('addproductwimage-err-response', error.response.data);
                    else
                        console.log('addproductwimage-err-config', error.config);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
});
var productSlice = toolkit_1.createSlice({
    name: 'productSlice',
    initialState: [],
    reducers: {
        addAll: function (state, action) {
            return action.payload;
        },
        // Find the product in global product
        findProduct: function (state, action) {
            return state.filter(function (product) { return product.title.includes(action.payload); });
        },
        // Sort global product based on category
        sortAllByCategory: function (state, action) {
            if (action.payload === 'asc') {
                state.sort(function (a, b) {
                    if (a.category.name.toLowerCase() > b.category.name.toLowerCase())
                        return 1;
                    if (a.category.name.toLowerCase() < b.category.name.toLowerCase())
                        return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return 1;
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return -1;
                    return 1;
                });
            }
            else {
                state.sort(function (a, b) {
                    if (a.category.name.toLowerCase() < b.category.name.toLowerCase())
                        return 1;
                    if (a.category.name.toLowerCase() > b.category.name.toLowerCase())
                        return -1;
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return 1;
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return -1;
                    return 1;
                });
            }
        },
        // Sort global product based on price
        sortAllByPrice: function (state, action) {
            if (action.payload === 'asc')
                state.sort(function (a, b) { return (a.price > b.price ? 1 : -1); });
            else
                state.sort(function (a, b) { return (a.price > b.price ? -1 : 1); });
        }
    },
    extraReducers: function (build) {
        build
            .addCase(exports.fetchAllProducts.fulfilled, function (state, action) {
            if (action.payload !== undefined && action.payload.data && action.payload.status === 200)
                return action.payload.data;
            else
                return state;
        })
            .addCase(exports.fetchAllProducts.pending, function (state, action) {
            console.log('Now loading...');
            return state;
        })
            .addCase(exports.fetchAllProducts.rejected, function (state, action) {
            return state;
        })
            .addCase(exports.addProductToServer.fulfilled, function (state, action) {
            if (action.payload !== undefined)
                state.push(action.payload);
            else
                return state;
        })
            .addCase(exports.modifyProduct.fulfilled, function (state, action) {
            if (action.payload !== undefined && action.payload.id !== undefined) {
                var mProduct_1 = action.payload;
                var newState = state.map(function (product) {
                    if (product.id === mProduct_1.id)
                        return action.payload;
                    else
                        return product;
                });
                return newState;
            }
            else
                return state;
        })
            .addCase(exports.deleteProduct.fulfilled, function (state, action) {
            // We can use hasOwnProperty to check for the property
            if (action.payload !== undefined && action.payload.hasOwnProperty('id') && action.payload.hasOwnProperty('status')) {
                var _a = action.payload, id_1 = _a.id, status = _a.status, message = _a.message;
                if (status === 200)
                    return state.filter(function (product) { return product.id !== id_1; });
                else
                    return state;
            }
            else {
                return state;
            }
        })
            // Testing using spread operator
            .addCase(exports.addProductAndImage.fulfilled, function (state, action) {
            if (action.payload !== undefined)
                return __spreadArrays(state, [action.payload]);
            else
                return __spreadArrays(state);
        });
    }
});
exports.productReducer = productSlice.reducer;
exports.addAll = (_a = productSlice.actions, _a.addAll), exports.findProduct = _a.findProduct, exports.sortAllByCategory = _a.sortAllByCategory, exports.sortAllByPrice = _a.sortAllByPrice;
