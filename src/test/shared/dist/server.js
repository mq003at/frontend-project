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
exports.__esModule = true;
var node_1 = require("msw/node");
var msw_1 = require("msw");
var jsonwebtoken_1 = require("jsonwebtoken");
// Initiate api
var productList = [
    {
        id: 1,
        title: "Bespoke Cotton Cheese",
        price: 970,
        description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
        images: ["https://api.lorem.space/image/fashion?w=640&h=480&r=1328", "https://api.lorem.space/image/fashion?w=640&h=480&r=1390", "https://api.lorem.space/image/fashion?w=640&h=480&r=7588"],
        creationAt: "2023-01-03T21:20:04.000Z",
        updatedAt: "2023-01-03T21:20:04.000Z",
        category: {
            id: 1,
            name: "nuevo",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=4441",
            creationAt: "2023-01-03T21:20:03.000Z",
            updatedAt: "2023-01-03T22:31:49.000Z"
        }
    },
    {
        id: 2,
        title: "Practical Frozen Bike",
        price: 872,
        description: "The Football Is Good For Training And Recreational Purposes",
        images: ["https://api.lorem.space/image?w=640&h=480&r=400", "https://api.lorem.space/image?w=640&h=480&r=263", "https://api.lorem.space/image?w=640&h=480&r=5425"],
        creationAt: "2023-01-03T21:20:04.000Z",
        updatedAt: "2023-01-03T21:20:04.000Z",
        category: {
            id: 5,
            name: "Others",
            image: "https://api.lorem.space/image?w=640&h=480&r=4933",
            creationAt: "2023-01-03T21:20:03.000Z",
            updatedAt: "2023-01-03T21:20:03.000Z"
        }
    },
    {
        id: 3,
        title: "Ergonomic Bronze Chicken",
        price: 486,
        description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        images: ["https://api.lorem.space/image/watch?w=640&h=480&r=8520", "https://api.lorem.space/image/watch?w=640&h=480&r=7601", "https://api.lorem.space/image/watch?w=640&h=480&r=8864"],
        creationAt: "2023-01-03T21:20:04.000Z",
        updatedAt: "2023-01-03T21:20:04.000Z",
        category: {
            id: 2,
            name: "Electronics",
            image: "https://api.lorem.space/image/watch?w=640&h=480&r=2889",
            creationAt: "2023-01-03T21:20:03.000Z",
            updatedAt: "2023-01-03T21:20:03.000Z"
        }
    },
];
var userList = [
    {
        id: 1,
        email: "john@mail.com",
        password: "changeme",
        name: "Jhon",
        role: "customer",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6440",
        creationAt: "2023-01-08T23:40:24.000Z",
        updatedAt: "2023-01-08T23:40:24.000Z"
    },
    {
        id: 2,
        email: "maria@mail.com",
        password: "12345",
        name: "Maria",
        role: "customer",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=1901",
        creationAt: "2023-01-08T23:40:24.000Z",
        updatedAt: "2023-01-08T23:40:24.000Z"
    },
    {
        id: 3,
        email: "admin@mail.com",
        password: "admin123",
        name: "Admin",
        role: "admin",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=7019",
        creationAt: "2023-01-08T23:40:24.000Z",
        updatedAt: "2023-01-08T23:40:24.000Z"
    },
];
var categoryList = [
    {
        id: 1,
        name: "Clothes",
        image: "https://api.lorem.space/image/fashion?w=640&h=480&r=3248",
        creationAt: "2023-01-08T23:40:24.000Z",
        updatedAt: "2023-01-09T22:56:59.000Z"
    },
    {
        id: 2,
        name: "Electronics",
        image: "https://api.lorem.space/image/watch?w=640&h=480&r=9458",
        creationAt: "2023-01-08T23:40:24.000Z",
        updatedAt: "2023-01-08T23:40:24.000Z"
    },
    {
        id: 3,
        name: "Furniture",
        image: "https://api.lorem.space/image/furniture?w=640&h=480&r=9523",
        creationAt: "2023-01-08T23:40:24.000Z",
        updatedAt: "2023-01-09T22:57:09.000Z"
    },
];
// Stock function to randomize string
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
// Initiating mock server, with get / post / update / etc... method
var handler = [
    // GET request, return mock data
    msw_1.rest.get("https://api.escuelajs.co/api/v1/products", function (req, res, ctx) {
        return res(ctx.json(productList));
    }),
    // POST request, replace data in server with the input data from req
    msw_1.rest.post("https://api.escuelajs.co/api/v1/products", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    product = _a.sent();
                    if (product.price < 0)
                        return [2 /*return*/, res(ctx.status(400, "Invalid data. Price should not be negative."))];
                    else {
                        productList.push(product);
                        return [2 /*return*/, res(ctx.json(product))];
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    // PUT request, replace data in server with the input data from req
    msw_1.rest.put("https://api.escuelajs.co/api/v1/products/:id", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var update, id, foundProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    update = _a.sent();
                    id = parseInt(req.params.id);
                    foundProduct = productList.find(function (i) { return i.id === id; });
                    if (!foundProduct)
                        return [2 /*return*/, res(ctx.status(404, "Cannot find product id"))];
                    else {
                        productList = productList.map(function (item) { return (item.id === id ? __assign(__assign({}, foundProduct), update) : item); });
                        return [2 /*return*/, res(ctx.json(__assign(__assign({}, foundProduct), update)))];
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    // DELETE request, replace data in server with the input data from req
    msw_1.rest["delete"]("https://api.escuelajs.co/api/v1/products/:id", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var id, foundProduct;
        return __generator(this, function (_a) {
            id = parseInt(req.params.id);
            foundProduct = productList.find(function (item) { return item.id === id; });
            if (!foundProduct)
                return [2 /*return*/, res(ctx.status(404, "Cannot find id"))];
            else {
                productList = productList.filter(function (item) { return item.id !== id; });
                return [2 /*return*/, res(ctx.json({ message: "Product deleted successfully" }))];
            }
            return [2 /*return*/];
        });
    }); }),
    // POST request to upload images
    msw_1.rest.post("https://api.escuelajs.co/api/v1/files/upload", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var file, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    file = _a.sent();
                    name = makeid(4);
                    return [2 /*return*/, res(ctx.json({
                            originalname: "Djhv7NO - Imgur.png",
                            filename: name + ".png",
                            location: "https://api.escuelajs.co/api/v1/files/" + name + ".png"
                        }))];
            }
        });
    }); }),
    // GET all users
    msw_1.rest.get("https://api.escuelajs.co/api/v1/users", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, res(ctx.json(userList))];
        });
    }); }),
    // LOGIN auth
    msw_1.rest.post("https://api.escuelajs.co/api/v1/auth/login", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var account, foundUser, access_token, refresh_token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    account = _a.sent();
                    foundUser = userList.find(function (user) { return user.email === account.email && user.password === account.password; });
                    if (!foundUser)
                        return [2 /*return*/, res(ctx.status(401, "Unauthorized"))];
                    else {
                        access_token = jsonwebtoken_1["default"].sign(foundUser, "accesskeymock");
                        refresh_token = jsonwebtoken_1["default"].sign(foundUser, "refreshkeymock");
                        return [2 /*return*/, res(ctx.json({ access_token: access_token, refresh_token: refresh_token }))];
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    // LOGIN
    msw_1.rest.get("https://api.escuelajs.co/api/v1/auth/profile", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var access_token_arr, access_token, foundUser;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ((_a = req.headers.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" "))];
                case 1:
                    access_token_arr = _b.sent();
                    if (!access_token_arr)
                        return [2 /*return*/, res(ctx.status(401, "Unauthorized"))];
                    else {
                        access_token = access_token_arr[1];
                        foundUser = jsonwebtoken_1["default"].verify(access_token, "accesskeymock");
                        return [2 /*return*/, res(ctx.json(foundUser))];
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    // Get all category
    msw_1.rest.get("https://api.escuelajs.co/api/v1/categories", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, res(ctx.json(categoryList))];
        });
    }); }),
    // Add new cat
    msw_1.rest.post("https://api.escuelajs.co/api/v1/categories", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    data = _a.sent();
                    data.id = categoryList.length + 1;
                    categoryList.push(data);
                    return [2 /*return*/, res(ctx.json(data))];
            }
        });
    }); }),
    // Update the cat
    msw_1.rest.put("https://api.escuelajs.co/api/v1/categories/:id", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var update, id, foundCat, updatedCat_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    update = _a.sent();
                    id = parseInt(req.params.id);
                    foundCat = categoryList.find(function (i) { return i.id === id; });
                    if (!foundCat)
                        return [2 /*return*/, res(ctx.status(404, "Cannot find product id"))];
                    else {
                        updatedCat_1 = __assign(__assign({}, foundCat), update);
                        categoryList = categoryList.map(function (item) { return (item.id === id ? updatedCat_1 : item); });
                        return [2 /*return*/, res(ctx.json(updatedCat_1))];
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    // Get all category
    msw_1.rest.get("https://api.escuelajs.co/api/v1/categories", function (req, res, ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, res(ctx.json(categoryList))];
        });
    }); }),
];
var server = node_1.setupServer.apply(void 0, handler);
exports["default"] = server;
