import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  type: yup.string().required(),
<<<<<<< Updated upstream
  quantityInStock: yup.number().min(0).required(),
  price: yup.number().required().min(100),
  description: yup.string().nullable(),
=======
  price: yup.number().required().moreThan(100),
  quantityInStock: yup.number().required().min(0),
  description: yup.string(),
>>>>>>> Stashed changes
  file: yup.mixed().when('pictureUrl', {
    is: (value: string) => !value,
    then: yup.mixed().required('Please provide an image'),
  }),
});
