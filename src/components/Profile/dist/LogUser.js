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
var LogUser = function (props) {
    var user = reduxHook_1.useAppSelector(function (state) { return state.userReducer; });
    var dispatch = reduxHook_1.useAppDispatch();
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(false), isRegister = _a[0], setIsRegister = _a[1];
    var _b = react_1.useState(false), isRememberMe = _b[0], setIsRemember = _b[1];
    // const [isEmailAvailable, setEmailAvailable] = useState<boolean | null>(null);
    react_1.useEffect(function () {
        if (user.currentUser) {
            navigate("/profile");
        }
    }, [user.currentUser, navigate]);
    var validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is Required')
    });
    var logUserForm = formik_1.useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: function (values) {
            if (isRegister) {
                // Register user if checkbox is ticked
                dispatch(userReducer_1.addUser({ user: {
                        name: 'User',
                        email: values.email,
                        password: values.password,
                        role: 'customer',
                        id: 0,
                        avatar: 'https://i.pravatar.cc/300'
                    }, isRememberMe: isRememberMe }));
            }
            else {
                // Or, log in the user by getting their token info then use it to get the profile. After getting profile -> useEffect will navigate
                dispatch(userReducer_1.authCredential({ account: {
                        email: values.email,
                        password: values.password
                    }, isRememberMe: isRememberMe }));
            }
        },
        validationSchema: validationSchema
    });
    return (React.createElement(material_1.Box, { className: "logUser__wrapper" },
        React.createElement(material_1.Box, { className: "logUser__content" },
            React.createElement(material_1.Card, null,
                React.createElement(material_1.CardContent, { className: "logUser__card" },
                    React.createElement(material_1.Typography, null, "Welcome to Winston Company"),
                    React.createElement(material_1.Typography, null, "Please input your email and password to login"),
                    React.createElement("form", { className: "logUser__form", onSubmit: logUserForm.handleSubmit },
                        React.createElement(material_1.Box, null,
                            React.createElement(material_1.Grid, { container: true, spacing: '1.5em' },
                                React.createElement(material_1.Grid, { className: "logUser__grid", item: true, xs: 6 },
                                    React.createElement(material_1.TextField, __assign({ id: "email", label: "Email" }, logUserForm.getFieldProps('email'), { helperText: logUserForm.errors.email ? logUserForm.errors.email : '', error: logUserForm.touched.email && logUserForm.errors.email !== undefined })),
                                    React.createElement(material_1.FormControlLabel, { label: "Remember me?", control: React.createElement(material_1.Checkbox, { checked: isRememberMe, onChange: function () { return setIsRemember(!isRememberMe); } }) })),
                                React.createElement(material_1.Grid, { className: "logUser__grid", item: true, xs: 6 },
                                    React.createElement(material_1.TextField, __assign({ id: "password", label: "Password", type: "password" }, logUserForm.getFieldProps('password'), { helperText: logUserForm.errors.password ? logUserForm.errors.password : '', error: logUserForm.touched.password && logUserForm.errors.password !== undefined })),
                                    React.createElement(material_1.Button, { type: "submit" }, "Proceed")))),
                        React.createElement(material_1.FormControlLabel, { label: "Check me to register", control: React.createElement(material_1.Checkbox, { checked: isRegister, onChange: function () { return setIsRegister(!isRegister); } }) })))))));
};
exports["default"] = LogUser;
