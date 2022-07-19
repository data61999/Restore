import * as yup from 'yup';

export const validationSchema = [
  yup.object({
    fullName: yup.string().required('Fullname is required'),
    address1: yup.string().required('Address 1 is required'),
    address2: yup.string(),
    city: yup.string().required('City is required'),
<<<<<<< Updated upstream
    phoneNumber: yup.number().required(),
=======
    phoneNumber: yup.number().required('Phone number is required'),
>>>>>>> Stashed changes
    // state: yup.string().required('State is required'),
    // zip: yup.string().required('Zip is required'),
    country: yup.string().required('Country is required'),
  }),
  yup.object(),
];
