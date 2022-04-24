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
import Product from '../../app/models/Product';

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
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
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
