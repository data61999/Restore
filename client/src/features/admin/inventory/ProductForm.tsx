import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import AppDropzone from '../../../app/components/AppDropzone';
import AppSelectList from '../../../app/components/AppSelectList';
import AppTextInput from '../../../app/components/AppTextInput';
import { Product } from '../../../app/models/Product';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/store/configureStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../productValidation';
import { URL } from 'url';
import { LoadingButton } from '@mui/lab';
import agent from '../../../app/api/agent';
import { setProduct } from '../../catalog/catalogSlice';

interface Props {
  product?: Product;
  onCancel: () => void;
}

const ProductForm = ({ product, onCancel }: Props) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm({
    mode: 'all',
    resolver: yupResolver<any>(validationSchema),
  });
  const { brands, types } = useAppSelector((state) => state.catalog);
  const watchFile = watch('file', null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  const handleSubmitData = async (data: FieldValues) => {
    try {
      let response: Product;
      if (product) {
        response = await agent.Admin.updateProduct(data);
      } else {
        response = await agent.Admin.createProduct(data);
      }
      dispatch(setProduct(response));
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name='name' label='Product name' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={brands}
              name='brand'
              label='Brand'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={types}
              name='type'
              label='Type'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type='number'
              control={control}
              name='price'
              label='Price'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              type='number'
              name='quantityInStock'
              label='Quantity in Stock'
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              multiline={true}
              rows={4}
              name='description'
              label='Description'
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <AppDropzone control={control} name='file' />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt='preview'
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
          <Button
            variant='contained'
            color='inherit'
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isDirty}
            type='submit'
            variant='contained'
            color='success'
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
