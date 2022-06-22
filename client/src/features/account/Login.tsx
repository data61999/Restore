import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInAsync } from './accountSlice';

export default function Login() {
  const history = useHistory();
  const location = useLocation<any>();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const formSubmit = async (data: FieldValues) => {
    try {
      await dispatch(signInAsync(data));
      history.push(location.state?.from.pathname || '/catalog');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(formSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          fullWidth
          label='Username'
          autoComplete='username'
          autoFocus
          {...register('username', { required: 'Username is requied' })}
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          autoComplete='current-password'
          {...register('password', { required: 'Password is requied' })}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/register'>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
