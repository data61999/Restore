import {
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';
import Review from './Review';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './checkoutValidation';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { clearBasket } from '../basket/basketSlice';
import { LoadingButton } from '@mui/lab';
import { resetProductParams } from '../catalog/catalogSlice';

const steps = ['Shipping address', 'Review your order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    // case 2:
    //   return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(currentValidationSchema),
  });

  useEffect(() => {
    agent.Account.getUserAddress().then((response) => {
      if (response) {
        methods.reset({
          ...methods.getValues(),
          ...response,
          saveAddress: false,
        });
      }
    });
  }, [methods]);

  const handleNext = async (data: FieldValues) => {
    console.log(data);
    const { nameOnCard, saveAddress, ...shippingAddress } = data;

    console.log(data);

    if (activeStep === steps.length - 1) {
      try {
        setLoading(true);
        const orderNum = await agent.Orders.create({
          saveAddress,
          shippingAddress,
        });
        setOrderNumber(orderNum);
        dispatch(clearBasket());
        dispatch(resetProductParams());
        setActiveStep(activeStep + 1);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <Paper
        variant='outlined'
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component='h1' variant='h4' align='center'>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order number is {orderNumber}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <LoadingButton
                    loading={loading}
                    disabled={
                      !methods.formState.isValid || basket?.items.length === 0
                    }
                    variant='contained'
                    type='submit'
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </LoadingButton>
                </Box>
              </form>
            </>
          )}
        </>
      </Paper>
    </FormProvider>
  );
}
