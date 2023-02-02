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
var _a;
exports.__esModule = true;
exports.logOutCurrentUser = exports.clearEmailCheck = exports.makeSpecialOffersForUser = exports.userReducer = exports.validateEmail = exports.updateUser = exports.loginUser = exports.authCredential = exports.addUser = exports.fetchAllUsers = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var axios_1 = require("axios");
var sharedInstance_1 = require("../../test/shared/sharedInstance");
// Fetch all users from API
exports.fetchAllUsers = toolkit_1.createAsyncThunk("fetchAllUsers", function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].get("users")];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error))
                    return [2 /*return*/, res.data];
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Sign up a user + testing params. Should work like props
exports.addUser = toolkit_1.createAsyncThunk("addUser", function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].post("users", {
                        name: params.user.name,
                        email: params.user.email,
                        password: params.user.password,
                        avatar: params.user.avatar
                    })];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error)) {
                    if (params.isRememberMe)
                        localStorage.setItem("user", JSON.stringify(res.data));
                    return [2 /*return*/, res.data];
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// User Auth - API not working atm
exports.authCredential = toolkit_1.createAsyncThunk("authCredential", function (params, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, sessionData, e_3, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sharedInstance_1["default"].post("auth/login", params.account)];
                case 1:
                    res = _b.sent();
                    if (!(res.data instanceof Error)) {
                        sessionData = res.data;
                        dispatch(exports.loginUser({ access_token: sessionData.access_token, isRememberMe: params.isRememberMe }));
                        return [2 /*return*/, sessionData];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    error = e_3;
                    if (error.response && error.response.status === 401) {
                        // Server return that email or password is wrong
                        console.log("Incorrect login email or password.");
                    }
                    else
                        return [2 /*return*/, error];
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// LOGIN & Get user's profile
exports.loginUser = toolkit_1.createAsyncThunk("loginUser", function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_4, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].get("auth/profile", {
                        headers: {
                            Authorization: "Bearer " + params.access_token
                        }
                    })];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error)) {
                    if (params.isRememberMe)
                        localStorage.setItem("user", JSON.stringify(res.data));
                    return [2 /*return*/, res.data];
                }
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                error = e_4;
                return [2 /*return*/, error];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update User
exports.updateUser = toolkit_1.createAsyncThunk("updateUser", function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_5, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].put("users/" + user.id, {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    })];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error)) {
                }
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                error = e_5;
                return [2 /*return*/, error];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Validate emails
exports.validateEmail = toolkit_1.createAsyncThunk("validateUser", function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_6, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sharedInstance_1["default"].post("/users/is-available", {
                        email: email
                    })];
            case 1:
                res = _a.sent();
                if (!(res.data instanceof Error))
                    return [2 /*return*/, res.data];
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                error = e_6;
                return [2 /*return*/, error];
            case 3: return [2 /*return*/];
        }
    });
}); });
var userSlice = toolkit_1.createSlice({
    name: "userSlice",
    initialState: { userList: [], specialOffers: undefined },
    reducers: {
        makeSpecialOffersForUser: function (state, action) {
            // Randomize special offers
            if (!state.specialOffers && action.payload.length > 0) {
                var allProducts_1 = action.payload;
                var tempArray_1 = [];
                var randomIndex = [];
                for (var i = 0; i < 5; i++) {
                    var rI = Math.floor(Math.random() * 100); //Some data after #100 is broken
                    randomIndex.push(rI);
                }
                randomIndex.forEach(function (index) { return tempArray_1.push(allProducts_1[index]); });
                return __assign(__assign({}, state), { specialOffers: tempArray_1 });
            }
            return state;
        },
        clearEmailCheck: function (state) {
            if (state.isAvailable !== undefined) {
                delete state.isAvailable;
            }
        },
        logOutCurrentUser: function (state) {
            if (state.currentUser !== undefined) {
                delete state.currentUser;
            }
        }
    },
    extraReducers: function (build) {
        build
            .addCase(exports.fetchAllUsers.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || !action.payload)
                return state;
            else {
                return __assign(__assign({}, state), { userList: action.payload });
            }
        })
            .addCase(exports.addUser.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || !action.payload)
                return state;
            else {
                return __assign(__assign({}, state), { currentUser: action.payload });
            }
        })
            .addCase(exports.authCredential.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || !action.payload || !state)
                return state;
            else
                return __assign(__assign({}, state), { session: action.payload });
        })
            .addCase(exports.loginUser.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || !action.payload || !state)
                return state;
            else {
                return __assign(__assign({}, state), { currentUser: action.payload });
            }
            ;
        })
            .addCase(exports.updateUser.fulfilled, function (state, action) {
        })
            .addCase(exports.validateEmail.fulfilled, function (state, action) {
            if (action.payload instanceof axios_1.AxiosError || !action.payload || !state)
                return state;
            else
                return __assign(__assign({}, state), action.payload);
        });
    }
});
exports.userReducer = userSlice.reducer;
exports.makeSpecialOffersForUser = (_a = userSlice.actions, _a.makeSpecialOffersForUser), exports.clearEmailCheck = _a.clearEmailCheck, exports.logOutCurrentUser = _a.logOutCurrentUser;
