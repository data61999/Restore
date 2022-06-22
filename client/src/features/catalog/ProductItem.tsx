import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../../app/models/Product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addItemToBasketAsync } from '../basket/basketSlice';

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      />
      <CardMedia
        component='img'
        height='140'
        image={product.pictureUrl}
        alt={product.name}
        sx={{ objectFit: 'contain', bgcolor: 'primary.light' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status === `pendingAddItem${product.id}`}
          size='small'
          onClick={() =>
            dispatch(addItemToBasketAsync({ productId: product.id }))
          }
        >
          Add to cart
        </LoadingButton>
        <Button size='small' component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
