import { Box, Button, Grid, Typography } from '@mui/material';
import { BasketItem } from '../../app/models/Basket';
import { Order } from '../../app/models/Order';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

const OrderDetail = ({ order, setSelectedOrder }: Props) => {
  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography sx={{ p: 2 }} gutterBottom variant='h4'>
          Order #{order.id} - {order.orderStatus}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size='large'
          variant='contained'
        >
          Back
        </Button>
      </Box>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={order.subtotal} />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetail;
