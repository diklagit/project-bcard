import Input from './common/input';
import PageHeader from './common/pageHeader';
import { useFormik } from 'formik';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { validateFormikUsingJoi } from '../utils/validateFormikUsingJoi';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth.context';
import usersService from '../services/usersServices';

const UserInfoEdit = () => {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const { user, fullUser, getFullUser } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      // name
      first: '',
      middle: '',
      last: '',
      //
      phone: '',

      //image
      url: '',
      alt: '',
      //
      //address
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: '',
      //
    },

    validate: validateFormikUsingJoi({
      // name
      first: Joi.string().min(2).max(256).required().label('First Name'),
      middle: Joi.string().min(2).max(256).label('Middle Name').allow(''),
      last: Joi.string().min(2).max(256).required().label('Last Name'),
      phone: Joi.string()
        .min(9)
        .max(11)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label('Phone'),
      // image
      url: Joi.string().min(14).max(1024).label('Image url').allow(''),
      alt: Joi.string().min(2).max(256).label('Image description').allow(''),
      // address
      state: Joi.string().min(2).max(256).label('State').allow(''),
      country: Joi.string().min(2).max(256).required().label('Country'),
      city: Joi.string().min(2).max(256).required().label('City'),
      street: Joi.string().min(2).max(256).required().label('Street'),
      houseNumber: Joi.number()
        .min(1)
        .max(256)
        .required()
        .label('House Number'),
      zip: Joi.number().min(2).max(256).required().label('Zip Code'),
    }),

    async onSubmit(values) {
      try {
        let sendValues = {
          name: {
            first: values.first,
            middle: values.middle,
            last: values.last,
          },
          image: {
            url: values.url,
            alt: values.alt,
          },
          address: {
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            zip: values.zip,
            houseNumber: values.houseNumber,
          },

          phone: values.phone,
        };
        await usersService.updateUser(user._id, sendValues);
        await getFullUser();
        toast('🦄 you`ve edited your info successfully!', {});
        navigate('/user-info');
      } catch (err) {
        toast('🤯 please try again later', {});
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!fullUser) {
      return;
    }
    //getting Users's values
    const {
      name: { first, middle, last },
      phone,
      image: { url, alt },
      address: { state, country, city, street, zip, houseNumber },
    } = fullUser;

    //setting User's values to the form's values
    form.setValues({
      //name
      first,
      middle,
      last,
      //
      phone,
      //image
      url,
      alt,
      //address
      state,
      country,
      city,
      street,
      zip,
      houseNumber,
    });
  }, [fullUser]);

  return (
    <>
      <PageHeader
        title={
          <span className='d-flex justify-content-center mb-2 fw-4'>
            User Info Edit
          </span>
        }
        description='here you can edit your info'
      />

      <form
        onSubmit={form.handleSubmit}
        className='row justify-content-center gx-5 g-3 mt-2'
      >
        {serverError && <div className='alert alert-danger'>{serverError}</div>}
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('first')}
            type='text'
            label='First Name'
            placeholder='First Name'
            required
            error={form.touched.first && form.errors.first}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('middle')}
            type='text'
            label='Middle Name'
            placeholder='Middle Name'
            error={form.touched.middle && form.errors.middle}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('last')}
            type='text'
            label='Last Name'
            placeholder='Last Name'
            required
            error={form.touched.last && form.errors.last}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('phone')}
            type='text'
            label='Phone'
            placeholder='Phone'
            required
            error={form.touched.phone && form.errors.phone}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('url')}
            type='url'
            label='Image Url'
            placeholder='Image Url'
            error={form.touched.url && form.errors.url}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('alt')}
            type='text'
            label='Image description'
            placeholder='Image description'
            error={form.touched.alt && form.errors.alt}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('state')}
            type='text'
            label='State'
            placeholder='State'
            error={form.touched.state && form.errors.state}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('country')}
            type='text'
            label='Country'
            placeholder='Country'
            required
            error={form.touched.country && form.errors.country}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('city')}
            type='text'
            label='City'
            placeholder='City'
            required
            error={form.touched.city && form.errors.city}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('street')}
            type='text'
            label='Street'
            placeholder='Street'
            required
            error={form.touched.street && form.errors.street}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('houseNumber')}
            type='number'
            label='House Number'
            placeholder='House Number'
            required
            error={form.touched.houseNumber && form.errors.houseNumber}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('zip')}
            type='number'
            label='Zip'
            placeholder='Zip'
            required
            error={form.touched.zip && form.errors.zip}
          />
        </div>

        <div className='my-3 col-md-10'>
          <button
            type='submit'
            disabled={!form.isValid}
            className='btn btn-primary mx-2'
          >
            User Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default UserInfoEdit;
