import { useState } from 'react';
import Input from './common/input';
import PageHeader from './common/pageHeader';
import { useFormik } from 'formik';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { validateFormikUsingJoi } from '../utils/validateFormikUsingJoi';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

const SignIn = ({ redirect }) => {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const form = useFormik({
    validateOnMount: true,

    initialValues: {
      email: '',
      password: '',
    },

    validate: validateFormikUsingJoi({
      email: Joi.string()
        .min(5)
        .max(256)
        .required()
        .email({ tlds: { allow: false } })
        .label('Email'),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{8,}$/
        )
        .label('Password'),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        toast('🦄 you`ve signed in successfully!', {});
        if (redirect) {
          navigate(redirect);
        }
      } catch (err) {
        toast('🤯 please try again later', {});
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <PageHeader
        title={
          <span className='d-flex justify-content-center mb-3 fw-4'>
            Sign-In
          </span>
        }
        description='sign in to your account'
      />

      <form
        onSubmit={form.handleSubmit}
        className='flex-direction-column justify-content-center gx-5'
      >
        {serverError && <div className='alert alert-danger'>{serverError}</div>}
        <div className='col-md-5 mx-auto'>
          <Input
            {...form.getFieldProps('email')}
            type='text'
            label='Email'
            placeholder='Email'
            required
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className='col-md-5 mx-auto'>
          <Input
            {...form.getFieldProps('password')}
            type='password'
            label='Password'
            placeholder='Password'
            required
            error={form.touched.password && form.errors.password}
          />
        </div>
        <div className='my-3 col-md-5 mx-auto'>
          <button
            type='submit'
            disabled={!form.isValid}
            className='btn btn-primary'
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
