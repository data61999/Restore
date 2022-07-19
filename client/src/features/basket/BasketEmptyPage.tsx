import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BasketEmptyPage = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      {/* <Typography variant='h3'>Your basket is empty!</Typography> */}

      <img src='/images/cart_empty.png' alt='cart empty' width='500px' />
      <Typography variant='h5' sx={{ color: '#666' }}>
        Start shopping, we have the thing you need
      </Typography>
      <Button
        sx={{ mt: 1 }}
        size='large'
        variant='contained'
        color='success'
        component={Link}
        to='/catalog'
      >
        Return Catalog Page
      </Button>
    </Box>
  );
};

export default BasketEmptyPage;
