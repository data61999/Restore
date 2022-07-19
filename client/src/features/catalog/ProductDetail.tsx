import { LoadingButton } from '@mui/lab';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  addItemToBasketAsync,
  removeItemFromBasket,
} from '../basket/basketSlice';
import { fetchProductAsync, productsSelector } from './catalogSlice';

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productsSelector.selectById(state, id)
  );

  const { status: productStatus } = useAppSelector((state) => state.catalog);

  const { basket, status } = useAppSelector((state) => state.basket);
  const [quantity, setQuantity] = useState<number>(1);
  const itemInBasket = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
    if (itemInBasket) setQuantity(itemInBasket.quantity);
  }, [id, itemInBasket, product, dispatch]);

  const handleChangeQuantity = (e: any) => {
    if (parseInt(e.target.value) >= 0) setQuantity(parseInt(e.target.value));
  };

  const handleUpdateCart = () => {
    if (!itemInBasket || quantity > itemInBasket?.quantity) {
      const updatedQuantity = itemInBasket
        ? quantity - itemInBasket.quantity
        : quantity;
      dispatch(
        addItemToBasketAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = itemInBasket.quantity - quantity;
      dispatch(
        removeItemFromBasket({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  };

  if (productStatus.includes('pending'))
    return <LoadingComponent message='Loading product...' />;

  if (!product) return <Typography variant='h2'>Product not found</Typography>;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: '450px', height: '450px', objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h3'>{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant='h4' color='secondary'>
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                type='number'
                label='Quantity in cart'
                fullWidth
                value={quantity}
                onChange={handleChangeQuantity}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                loading={status.includes('pending')}
                sx={{ height: '55px' }}
                color='primary'
                size='large'
                variant='contained'
                fullWidth
                onClick={handleUpdateCart}
                disabled={
                  product.quantityInStock <= 0 ||
                  (quantity === 0 && !itemInBasket) ||
                  quantity === itemInBasket?.quantity
                }
              >
                {product.quantityInStock <= 0
                  ? 'Out of stock'
                  : itemInBasket
                  ? 'Update quantity'
                  : 'Add to cart'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetail;
