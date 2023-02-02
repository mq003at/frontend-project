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
exports.__esModule = true;
exports.categoryReducer = exports.addCatAndImage = exports.updateCategory = exports.addCategoryToServer = exports.fetchAllCategories = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var axios_1 = require("axios");
var sharedInstance_1 = require("../../test/shared/sharedInstance");
// Fetch all categories
exports.fetchAllCategories = toolkit_1.createAsyncThunk("fetchAllCategory", function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].get("categories")];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error))
                    return [2 /*return*/, res.data];
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                error = e_1;
                return [2 /*return*/, error];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Post in a category
exports.addCategoryToServer = toolkit_1.createAsyncThunk("createCategoryToServer", function (category) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_2, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].post("categories", category)];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error))
                    return [2 /*return*/, res.data];
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                error = e_2;
                return [2 /*return*/, error];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update category
exports.updateCategory = toolkit_1.createAsyncThunk("updateCategory", function (_a) {
    var id = _a.id, update = _a.update;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, e_3, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sharedInstance_1["default"].put("categories/" + id, update)];
                case 1:
                    res = _b.sent();
                    if (!(res.data instanceof Error))
                        return [2 /*return*/, res.data];
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    error = e_3;
                    return [2 /*return*/, error];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// Post Category but with image
exports.addCatAndImage = toolkit_1.createAsyncThunk("addProductAndImage", function (_a) {
    var image = _a.image, category = _a.category;
    return __awaiter(void 0, void 0, void 0, function () {
        var images, response, res2, e_4, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    images = "";
                    return [4 /*yield*/, sharedInstance_1["default"].post("/files/upload", image)];
                case 1:
                    response = _b.sent();
                    if (!(response.data instanceof Error) && response.data.location)
                        images = response.data.location;
                    return [4 /*yield*/, sharedInstance_1["default"].post("products", __assign(__assign({}, category), { images: images }))];
                case 2:
                    res2 = _b.sent();
                    return [2 /*return*/, res2.data];
                case 3:
                    e_4 = _b.sent();
                    error = e_4;
                    return [2 /*return*/, error];
                case 4: return [2 /*return*/];
            }
        });
    });
});
var initialState = [];
var categorySlice = toolkit_1.createSlice({
    name: "categorySlice",
    initialState: initialState,
    reducers: {},
    extraReducers: function (build) {
        build
            .addCase(exports.fetchAllCategories.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || !action.payload === undefined)
                return state;
            else
                return action.payload;
        })
            .addCase(exports.addCategoryToServer.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || action.payload === undefined)
                return state;
            else
                return __spreadArrays(state, [action.payload]);
        })
            .addCase(exports.updateCategory.fulfilled, function (state, action) {
            if (!(action.payload instanceof axios_1.AxiosError) && (action.payload !== undefined)) {
                var data_1 = action.payload;
                return state.map(function (cat) { return cat.id === data_1.id ? data_1 : cat; });
            }
            else
                return state;
        })
            .addCase(exports.addCatAndImage.fulfilled, function (state, action) {
            if (action.payload instanceof Error || action.payload === undefined)
                return state;
            else
                return __spreadArrays(state, [action.payload]);
        });
    }
});
exports.categoryReducer = categorySlice.reducer;
