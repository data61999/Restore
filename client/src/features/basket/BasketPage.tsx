import { Button, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from './BasketSummary';
import BasketTable from './BasketTable';

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  // if (status) return <LoadingComponent message='basket loading...' />;

  if (!basket)
    return <Typography variant='h3'>Your basket is empty</Typography>;

  return (
    <Fragment>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
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
