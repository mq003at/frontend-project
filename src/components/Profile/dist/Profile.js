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
var formik_1 = require("formik");
var react_1 = require("react");
var reduxHook_1 = require("../../hooks/reduxHook");
var Yup = require("yup");
var userReducer_1 = require("../../redux/reducers/userReducer");
var react_router_dom_1 = require("react-router-dom");
var userReducer_2 = require("../../redux/reducers/userReducer");
var productReducer_1 = require("../../redux/reducers/productReducer");
var Profile = function () {
    var _a, _b;
    var user = reduxHook_1.useAppSelector(function (state) { return state.userReducer; });
    var currentUser = user.currentUser;
    var categories = reduxHook_1.useAppSelector(function (state) { return state.categoryReducer; });
    var dispatch = reduxHook_1.useAppDispatch();
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        if (!user.currentUser)
            navigate('/login');
        if (!categories || categories.length === 0)
            navigate('/');
        console.log('cat', categories);
    }, [user, navigate, categories]);
    var profileSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
        name: Yup.string().min(3, 'Name should be at least 3 characters').required('Name is required.')
    });
    var addProductSchema = Yup.object().shape({
        productName: Yup.string().min(3, 'Name should be at least 3 characters').required('Name is required'),
        productDescription: Yup.string().min(6, 'Description should be at least 6 characters').required('Description is required'),
        productPrice: Yup.number().positive('The number must be bigger than 0').required('Price is required')
    });
    var profileForm = formik_1.useFormik({
        initialValues: {
            email: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
            password: currentUser === null || currentUser === void 0 ? void 0 : currentUser.password,
            name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name
        },
        onSubmit: function (values) {
            if (currentUser && values.name && values.email && values.password) {
                dispatch(userReducer_1.updateUser({
                    id: currentUser.id,
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: currentUser.role,
                    avatar: currentUser.avatar
                }));
            }
        },
        validationSchema: profileSchema
    });
    var addProductForm = formik_1.useFormik({
        initialValues: {
            productName: '',
            productCategory: '',
            productDescription: '',
            productPrice: '',
            productImages: ['https://api.lorem.space/image/shoes?w=640&h=480&r=2497', 'https://api.lorem.space/image/shoes?w=640&h=480&r=5307', 'https://api.lorem.space/image/shoes?w=640&h=480&r=4464']
        },
        onSubmit: function (values) {
            var newProduct = {
                title: values.productName,
                price: Number(values.productPrice),
                description: values.productDescription,
                categoryId: Number(values.productCategory) + 1,
                images: values.productImages
            };
            dispatch(productReducer_1.addProductToServer(newProduct));
        },
        validationSchema: addProductSchema
    });
    return (React.createElement(material_1.Box, { className: "profile__wrapper" },
        React.createElement(material_1.Box, { className: "profile__content" },
            React.createElement(material_1.Card, null,
                React.createElement(material_1.CardContent, { className: "profile__card" },
                    React.createElement("form", { className: "profile__profileForm", onSubmit: profileForm.handleSubmit },
                        React.createElement(material_1.CardMedia, { component: "img", sx: { width: 150 }, image: currentUser === null || currentUser === void 0 ? void 0 : currentUser.avatar, alt: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name }),
                        React.createElement(material_1.Grid, { container: true, spacing: '1.5em' },
                            React.createElement(material_1.Grid, { className: "profile__grid", item: true, xs: 6 },
                                React.createElement(material_1.Typography, null, "Profile Created"),
                                React.createElement(material_1.Typography, null, (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.creationAt) === null || _a === void 0 ? void 0 : _a.substring(0, 10))),
                            React.createElement(material_1.Grid, { className: "profile__grid", item: true, xs: 6 },
                                React.createElement(material_1.Typography, null, "Profile Updated"),
                                React.createElement(material_1.Typography, null, (_b = currentUser === null || currentUser === void 0 ? void 0 : currentUser.updatedAt) === null || _b === void 0 ? void 0 : _b.substring(0, 10)))),
                        React.createElement(material_1.Typography, { className: "profile__sectionHeader" }, "Do you want to change your profile?"),
                        React.createElement(material_1.TextField, __assign({ className: "profile__textField", id: "name", label: "Name" }, profileForm.getFieldProps('name'), { helperText: profileForm.errors.name ? profileForm.errors.name : '', error: profileForm.touched.name && profileForm.errors.name !== undefined })),
                        React.createElement(material_1.TextField, __assign({ id: "email", label: "Email", className: "profile__textField" }, profileForm.getFieldProps('email'), { helperText: profileForm.errors.email ? profileForm.errors.email : '', error: profileForm.touched.email && profileForm.errors.email !== undefined })),
                        React.createElement(material_1.TextField, __assign({ id: "password", label: "Password", type: "password", className: "profile__textField" }, profileForm.getFieldProps('password'), { helperText: profileForm.errors.password ? profileForm.errors.password : '', error: profileForm.touched.password && profileForm.errors.password !== undefined })),
                        React.createElement(material_1.Grid, { container: true, spacing: '1.5em' },
                            React.createElement(material_1.Grid, { className: "profile__grid", item: true, xs: 6 },
                                React.createElement(material_1.Button, { type: "submit" }, "Update")),
                            React.createElement(material_1.Grid, { className: "profile__grid", item: true, xs: 6 },
                                React.createElement(material_1.Button, { onClick: function () { return dispatch(userReducer_2.logOutCurrentUser()); } }, "Logout")))))),
            categories.length > 0 && (React.createElement(material_1.Card, { className: "profile__addProduct" },
                React.createElement(material_1.CardContent, null,
                    React.createElement(material_1.Typography, { className: "profile__sectionHeader" }, "Add product to the system"),
                    React.createElement("form", { className: "profile__addProductForm", onSubmit: addProductForm.handleSubmit },
                        React.createElement(material_1.Box, { className: "profile__adProductWrapper" },
                            React.createElement(material_1.TextField, __assign({ id: "productName", label: "Product Name", className: "profile__textField" }, addProductForm.getFieldProps('productName'), { helperText: addProductForm.errors.productName ? addProductForm.errors.productName : '', error: addProductForm.touched.productName && addProductForm.errors.productName !== undefined })),
                            React.createElement(material_1.TextField, { id: "outlined-select-currency", select: true, label: "Select", defaultValue: categories[0].id }, categories.map(function (option) { return (React.createElement(material_1.MenuItem, { key: "category-" + option.name, value: option.id }, option.name)); })),
                            React.createElement(material_1.TextField, __assign({ id: "productDescription", label: "Product Description", className: "profile__textField" }, addProductForm.getFieldProps('productDescription'), { helperText: addProductForm.errors.productDescription ? addProductForm.errors.productDescription : '', error: addProductForm.touched.productDescription && addProductForm.errors.productDescription !== undefined })),
                            React.createElement(material_1.TextField, __assign({ id: "productPrice", label: "Product Price", type: "number", className: "profile__textField", InputProps: {
                                    endAdornment: React.createElement(material_1.InputAdornment, { position: "end" }, "EUR")
                                } }, addProductForm.getFieldProps('productPrice'), { helperText: addProductForm.errors.productPrice ? addProductForm.errors.productPrice : '', error: addProductForm.touched.productPrice && addProductForm.errors.productPrice !== undefined }))),
                        React.createElement(material_1.Box, { className: "profile__addProductSubmit" },
                            React.createElement(material_1.Button, { type: "submit" }, "Add Product")))))))));
};
exports["default"] = Profile;
