import { Box, Button, Card, CardContent, CardMedia, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import {  useFormik } from 'formik';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import * as Yup from 'yup';
import { updateUser } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { logOutCurrentUser } from '../../redux/reducers/userReducer';
import { addProductToServer } from '../../redux/reducers/productReducer';

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer);
  const currentUser = user.currentUser;
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.currentUser) navigate('/login');
    if (!categories || categories.length === 0) navigate('/');
    console.log('cat', categories);
  }, [user, navigate, categories]);

  const profileSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
    name: Yup.string().min(3, 'Name should be at least 3 characters').required('Name is required.'),
  });

  const addProductSchema = Yup.object().shape({
    productName: Yup.string().min(3, 'Name should be at least 3 characters').required('Name is required'),
    productDescription: Yup.string().min(6, 'Description should be at least 6 characters').required('Description is required'),
    productPrice: Yup.number().positive('The number must be bigger than 0').required('Price is required'),
  });

  const profileForm = useFormik({
    initialValues: {
      email: currentUser?.email,
      password: currentUser?.password,
      name: currentUser?.name,
    },
    onSubmit: (values) => {
      if (currentUser && values.name && values.email && values.password) {
        dispatch(
          updateUser({
            id: currentUser.id,
            name: values.name,
            email: values.email,
            password: values.password,
            role: currentUser.role,
            avatar: currentUser.avatar,
          })
        );
      }
    },
    validationSchema: profileSchema,
  });

  const addProductForm = useFormik({
    initialValues: {
      productName: '',
      productCategory: '',
      productDescription: '',
      productPrice: '',
      productImages: ['https://api.lorem.space/image/shoes?w=640&h=480&r=2497', 'https://api.lorem.space/image/shoes?w=640&h=480&r=5307', 'https://api.lorem.space/image/shoes?w=640&h=480&r=4464'],
    },
    onSubmit: (values) => {
      const newProduct = {
        title: values.productName,
        price: Number(values.productPrice),
        description: values.productDescription,
        categoryId: Number(values.productCategory) + 1,
        images: values.productImages,
      };
      console.log('new', newProduct);
      dispatch(addProductToServer(newProduct));
    },
    validationSchema: addProductSchema,
  });

  return (
    <Box className="profile__wrapper">
      <Box className="profile__content">
        <Card>
          <CardContent className="profile__card">
            <form className="profile__profileForm" onSubmit={profileForm.handleSubmit}>
              <CardMedia component="img" sx={{ width: 150 }} image={currentUser?.avatar} alt={currentUser?.name}></CardMedia>
              <Grid container spacing={'1.5em'}>
                <Grid className="profile__grid" item xs={6}>
                  <Typography>Profile Created</Typography>
                  <Typography>{currentUser?.creationAt?.substring(0, 10)}</Typography>
                </Grid>
                <Grid className="profile__grid" item xs={6}>
                  <Typography>Profile Updated</Typography>
                  <Typography>{currentUser?.updatedAt?.substring(0, 10)}</Typography>
                </Grid>
              </Grid>
              <Typography className="profile__sectionHeader">Do you want to change your profile?</Typography>
              <TextField
                className="profile__textField"
                id="name"
                label="Name"
                {...profileForm.getFieldProps('name')}
                helperText={profileForm.errors.name ? profileForm.errors.name : ''}
                error={profileForm.touched.name && profileForm.errors.name !== undefined}
              />
              <TextField
                id="email"
                label="Email"
                className="profile__textField"
                {...profileForm.getFieldProps('email')}
                helperText={profileForm.errors.email ? profileForm.errors.email : ''}
                error={profileForm.touched.email && profileForm.errors.email !== undefined}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                className="profile__textField"
                {...profileForm.getFieldProps('password')}
                helperText={profileForm.errors.password ? profileForm.errors.password : ''}
                error={profileForm.touched.password && profileForm.errors.password !== undefined}
              />
              <Grid container spacing={'1.5em'}>
                <Grid className="profile__grid" item xs={6}>
                  <Button type="submit">Update</Button>
                </Grid>
                <Grid className="profile__grid" item xs={6}>
                  <Button onClick={() => dispatch(logOutCurrentUser())}>Logout</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        {categories.length > 0 && (
          <Card className="profile__addProduct">
            <CardContent>
              <Typography className="profile__sectionHeader">Add product to the system</Typography>
              <form className="profile__addProductForm" onSubmit={addProductForm.handleSubmit}>
                <Box className="profile__adProductWrapper">
                  <TextField
                    id="productName"
                    label="Product Name"
                    className="profile__textField"
                    {...addProductForm.getFieldProps('productName')}
                    helperText={addProductForm.errors.productName ? addProductForm.errors.productName : ''}
                    error={addProductForm.touched.productName && addProductForm.errors.productName !== undefined}
                  />
                  <TextField id="outlined-select-currency" select label="Select" defaultValue={categories[0].id}>
                    {categories.map((option) => (
                      <MenuItem key={`category-${option.name}`} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="productDescription"
                    label="Product Description"
                    className="profile__textField"
                    {...addProductForm.getFieldProps('productDescription')}
                    helperText={addProductForm.errors.productDescription ? addProductForm.errors.productDescription : ''}
                    error={addProductForm.touched.productDescription && addProductForm.errors.productDescription !== undefined}
                  />
                  <TextField
                    id="productPrice"
                    label="Product Price"
                    type="number"
                    className="profile__textField"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
                    }}
                    {...addProductForm.getFieldProps('productPrice')}
                    helperText={addProductForm.errors.productPrice ? addProductForm.errors.productPrice : ''}
                    error={addProductForm.touched.productPrice && addProductForm.errors.productPrice !== undefined}
                  />
                </Box>
                <Box className="profile__addProductSubmit">
                  <Button type="submit">Add Product</Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
