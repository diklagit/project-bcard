import Input from './common/input';
import PageHeader from './common/pageHeader';
import { useFormik } from 'formik';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { useNavigate, useParams, Link } from 'react-router-dom';

import { validateFormikUsingJoi } from '../utils/validateFormikUsingJoi';
import { useState, useEffect } from 'react';
import cardsService from '../services/cardsService';
import { useCard } from '../hooks/useCard';
import { useAuth } from '../contexts/auth.context';

function normalizeError(error) {
  if (error.includes('duplicate')) {
    return 'Card with Email already exists';
  }
  return error;
}

const CardsEdit = () => {
  const [serverError, setServerError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();
  const card = useCard(id);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: '',
      subtitle: '',
      description: '',
      phone: '',
      email: '',
      web: '',
      //image
      url: '',
      alt: '',
      //address
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: '',
    },

    validate: validateFormikUsingJoi({
      title: Joi.string().min(2).max(256).required().label('Title'),
      subtitle: Joi.string().min(2).max(256).label('Subtitle'),
      description: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label('Description'),
      phone: Joi.string()
        .min(9)
        .max(11)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label('Phone'),
      email: Joi.string()
        .min(5)
        .max(256)
        .required()
        .label('Email')
        .email({ tlds: { allow: false } }),
      web: Joi.string().min(14).max(256).allow(''),
      //image
      url: Joi.string().min(14).required().label('Image url'),
      alt: Joi.string().min(2).max(256).required().label('Image description'),
      //address
      state: Joi.string().min(2).max(256).label('State').allow(''),
      country: Joi.string().min(2).max(256).required().label('Country'),
      city: Joi.string().min(2).max(256).required().label('City'),
      street: Joi.string().min(2).max(256).required().label('Street'),
      houseNumber: Joi.number().min(1).required().label('House Number'),
      zip: Joi.number().min(1).label('Zip Code').allow(''),
    }),

    async onSubmit(values) {
      try {
        let sendValues = {
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          phone: values.phone,
          email: values.email,
          web: values.web,
          image: {
            url: values.url,
            alt: values.alt,
          },
          address: {
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNumber,
            zip: values.zip,
          },
        };

        await cardsService.updateCard(card._id, sendValues);
        toast('🦄 your card was edited successfully!', {});
        navigate('/my-cards');
      } catch (err) {
        toast('🤯 please try again later', {});
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!card) {
      return;
    }
    const {
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      image: { url, alt },
      address: { state, country, city, street, houseNumber, zip },
    } = card;
    form.setValues({
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      //image
      url,
      alt,
      //address
      state,
      country,
      city,
      street,
      houseNumber,
      zip,
    });
  }, [card]);

  return (
    <>
      <PageHeader
        title={
          <span className='d-flex justify-content-center mb-2 fw-4'>
            Edit Card
          </span>
        }
        description='Edit Card'
      />

      {(user?.isBusiness || user?.isAdmin) && (
        <div className='row mt-2'>
          <Link
            className='someLink fs-4 fw-bold'
            style={{
              textAlign: 'start',
              transform: 'scale(0.82)',
            }}
            to={`/my-cards`}
          >
            return to 'My Cards'
          </Link>
        </div>
      )}

      <form
        onSubmit={form.handleSubmit}
        className='row g-3 mt-3 justify-content-center gx-5'
      >
        {serverError && (
          <div className='alert alert-danger'>
            {normalizeError(serverError)}
          </div>
        )}
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('title')}
            type='text'
            label='Title'
            placeholder='Title'
            required
            error={form.touched.title && form.errors.title}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('subtitle')}
            type='text'
            label='Subtitle'
            placeholder='Subtitle'
            required
            error={form.touched.subtitle && form.errors.subtitle}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('description')}
            type='text'
            label='Description'
            placeholder='Description'
            required
            error={form.touched.description && form.errors.description}
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
            {...form.getFieldProps('email')}
            type='email'
            label='Email'
            placeholder='Email'
            required
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('web')}
            type='text'
            label='Web'
            placeholder='Web'
            error={form.touched.web && form.errors.web}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('url')}
            type='url'
            label='Image Url'
            placeholder='Image Url'
            required
            error={form.touched.url && form.errors.url}
          />
        </div>
        <div className='col-md-5'>
          <Input
            {...form.getFieldProps('alt')}
            type='text'
            label='Image description'
            placeholder='Image description'
            required
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
            error={form.touched.zip && form.errors.zip}
          />
        </div>

        <div className='my-3 col-md-10'>
          <button
            type='submit'
            disabled={!form.isValid}
            className='btn btn-primary'
          >
            Edit Card
          </button>
        </div>
      </form>
    </>
  );
};

export default CardsEdit;
