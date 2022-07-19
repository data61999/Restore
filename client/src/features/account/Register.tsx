import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';

export default function Register() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const handleErrors = (errors: any) => {
    errors.forEach((error: string) => {
      if (error.includes('Email')) setError('email', { message: error });
      if (error.includes('Username')) setError('username', { message: error });
      if (error.includes('Password')) setError('password', { message: error });
    });
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
        Sign up
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success('Registration successful - you can loggin now');
              setTimeout(() => history.push('/login'), 2000);
            })
            .catch((errors) => handleErrors(errors))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          fullWidth
          label='Username'
          autoComplete='username'
          autoFocus
          {...register('username', {
            required: 'Username is requied',
          })}
          error={!!errors.username}
          helperText={errors?.username?.message}
        />

        <TextField
          margin='normal'
          fullWidth
          label='Email'
          autoComplete='email'
          {...register('email', {
            required: 'Email is requied',
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: 'Not a valid email',
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          autoComplete='current-password'
          {...register('password', {
            required: 'Password is requied',
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/,
              message:
                'Password does not meet complexity requiments (at least 6 characters, one uppercase, one lowercase, one digit)',
            },
          })}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />

        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/login'>{'Already have an account? Sign in'}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
