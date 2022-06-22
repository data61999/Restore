import { Grid } from '@mui/material';
import { Product } from '../../app/models/Product';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductItem from './ProductItem';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton key={product.id} />
          ) : (
            <ProductItem product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
