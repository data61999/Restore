import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from './BasketSummary';
import BasketTable from './BasketTable';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  // if (status) return <LoadingComponent message='basket loading...' />;

  if (!basket || basket.items.length === 0)
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Avatar>
          <RemoveShoppingCartIcon fontSize='large' color='primary' />
        </Avatar>
        <Typography variant='h3' sx={{ fontStyle: 'bold' }}>
          Your basket is empty
        </Typography>
        <Typography variant='h4' color='#777'>
          Start shopping, we have what you need!
        </Typography>
        <Button
          sx={{ mt: 1 }}
          variant='contained'
          color='success'
          size='large'
          component={Link}
          to='/catalog'
        >
          Return catalog page
        </Button>
      </Box>
    );

  return (
    <Fragment>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            disabled={basket.items.length === 0}
            component={Link}
            to='/checkout'
            variant='contained'
            fullWidth
            size='large'
          >
            Check out
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BasketPage;
