import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Form, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import * as Yup from 'yup';
import { addUser, authCredential, clearEmailCheck, loginUser, validateEmail } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LogUser: React.FC = (props) => {
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isCheck, setCheck] = useState(true);
  const [isEmailAvailable, setEmailAvailable] = useState<boolean | null>(null);


  useEffect(() => {
    if (user) console.log("sneak", user)
  }, [user])

  useEffect(() => {
    if (user.currentUser) navigate("/profile")
  }, [user.currentUser, navigate])


  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters')
      .required('Password is Required'),
  });
  

  const logUserForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      if (isCheck) {
        // Register user if checkbox is ticked
        dispatch(addUser({
          name: "User",
          email: values.email,
          password: values.password,
          role: "customer",
          id: 0,
          avatar: ""
        }))

      } else {
        // Or, log in the user by getting their token info then use it to get the profile. After getting profile -> useEffect will navigate
        dispatch(authCredential({
          email: values.email,
          password: values.password
        }))
      }
    },
    validationSchema,
  });

  return (
    <Box className="logUser__wrapper">
      <Box className="logUser__content">
        <Card>
          <CardContent className="logUser__card">
            <Typography>Welcome to Winston Company</Typography>
            <Typography>Login, or register, all in one form!</Typography>
            <Box>
              <form className="logUser__form" onSubmit={logUserForm.handleSubmit}>
                <Grid container spacing={'1.5em'}>
                  <Grid className="logUser__grid" item xs={6}>
                    <TextField
                      id="email"
                      label="Email"
                      {...logUserForm.getFieldProps('email')}
                      helperText={logUserForm.errors.email ? logUserForm.errors.email : ''}
                      error={logUserForm.touched.email && true}
                    />
                    <FormControlLabel
                      label="Check me to register"
                      control={<Checkbox checked={isCheck} onChange={() => setCheck(!isCheck)} />}
                    />
                  </Grid>

                  <Grid className="logUser__grid" item xs={6}>
                    <TextField
                      id="password"
                      label="Password"
                      {...logUserForm.getFieldProps('password')}
                      helperText={logUserForm.errors.password ? logUserForm.errors.password : ''}
                      error={logUserForm.touched.password && true}
                    />
                    <Button type="submit">Proceed</Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LogUser;
