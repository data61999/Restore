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
import { Link, useHistory } from 'react-router-dom';
import { Product } from '../../app/models/Product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addItemToBasketAsync } from '../basket/basketSlice';

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const history = useHistory();
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
        onClick={() => history.push(`/catalog/${product.id}`)}
        component='img'
        height='150'
        image={product.pictureUrl}
        alt={product.name}
<<<<<<< Updated upstream
        sx={{ objectFit: 'contain', bgcolor: '#d1e6fa' }}
=======
        sx={{ objectFit: 'contain', bgcolor: '#b6dcfb' }}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          disabled={product.quantityInStock <= 0}
          variant='outlined'
          sx={{ mr: 1 }}
=======
          variant='outlined'
          disabled={product.quantityInStock <= 0}
>>>>>>> Stashed changes
          loading={status === `pendingAddItem${product.id}`}
          size='small'
          onClick={() =>
            dispatch(addItemToBasketAsync({ productId: product.id }))
          }
          sx={{ mr: 1 }}
        >
          {product.quantityInStock <= 0 ? 'Out of stock' : 'Add to cart'}
        </LoadingButton>
        <Button
          variant='outlined'
          size='small'
          component={Link}
          to={`/catalog/${product.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
