import * as yup from 'yup';

export const validationSchema = [
  yup.object({
    fullName: yup.string().required('Fullname is required'),
    address1: yup.string().required('Address 1 is required'),
    address2: yup.string(),
    city: yup.string().required('City is required'),
    phoneNumber: yup.number().required('Phone number is required'),
    // state: yup.string().required('State is required'),
    // zip: yup.string().required('Zip is required'),
    country: yup.string().required('Country is required'),
  }),
  yup.object(),
];
