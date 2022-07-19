import { Button, Grid } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import BasketEmptyPage from './BasketEmptyPage';
import BasketSummary from './BasketSummary';
import BasketTable from './BasketTable';

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  // if (status) return <LoadingComponent message='basket loading...' />;

  if (!basket || basket.items.length === 0) return <BasketEmptyPage />;

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
