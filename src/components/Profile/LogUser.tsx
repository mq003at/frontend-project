import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import * as Yup from 'yup';
import { addUser, authCredential} from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LogUser: React.FC = (props) => {
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [isRememberMe, setIsRemember] = useState(false);
  // const [isEmailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (user.currentUser) {
      navigate("/profile");
    }
  }, [user.currentUser, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is Required'),
  });

  const logUserForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      if (isRegister) {
        // Register user if checkbox is ticked
        dispatch(
          addUser({user: {
            name: 'User',
            email: values.email,
            password: values.password,
            role: 'customer',
            id: 0,
            avatar: 'https://i.pravatar.cc/300',
          }, isRememberMe: isRememberMe})
        );
      } else {
        // Or, log in the user by getting their token info then use it to get the profile. After getting profile -> useEffect will navigate
        dispatch(
          authCredential({account: {
            email: values.email,
            password: values.password,
          }, isRememberMe: isRememberMe})
        );
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
            <Typography>Please input your email and password to login</Typography>
            <form className="logUser__form" onSubmit={logUserForm.handleSubmit}>
              <Box>
                <Grid container spacing={'1.5em'}>
                  <Grid className="logUser__grid" item xs={6}>
                    <TextField
                      id="email"
                      label="Email"
                      {...logUserForm.getFieldProps('email')}
                      helperText={logUserForm.errors.email ? logUserForm.errors.email : ''}
                      error={logUserForm.touched.email && logUserForm.errors.email !== undefined}
                    />
                    <FormControlLabel label="Remember me?" control={<Checkbox checked={isRememberMe} onChange={() => setIsRemember(!isRememberMe)} />} />
                  </Grid>

                  <Grid className="logUser__grid" item xs={6}>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      {...logUserForm.getFieldProps('password')}
                      helperText={logUserForm.errors.password ? logUserForm.errors.password : ''}
                      error={logUserForm.touched.password && logUserForm.errors.password !== undefined}
                    />
                    <Button type="submit">Proceed</Button>
                  </Grid>
                </Grid>
              </Box>
              <FormControlLabel label="Check me to register" control={<Checkbox checked={isRegister} onChange={() => setIsRegister(!isRegister)} />} />
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LogUser;
