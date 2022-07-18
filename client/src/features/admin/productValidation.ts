import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  type: yup.string().required(),
  quantityInStock: yup.number().min(0).required(),
  price: yup.number().required().min(100),
  description: yup.string().nullable(),
  file: yup.mixed().when('pictureUrl', {
    is: (value: string) => !value,
    then: yup.mixed().required('Please provide an image'),
  }),
});
