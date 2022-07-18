import { Grid, Paper } from '@mui/material';
import { useEffect } from 'react';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import PaginationApp from '../../app/components/PaginationApp';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import useProducts from '../../app/hook/useProducts';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductListAsync,
  setPageNumber,
  setProductParams,
} from './catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

const Catalog = () => {
  const dispatch = useAppDispatch();
  const {
    productList,
    productsLoaded,
    productParams,
    brands,
    types,
    filtersLoaded,
  } = useProducts();

  const { metaData } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductListAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <LoadingComponent message='Loading products...' />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) => {
              dispatch(setProductParams({ orderBy: event.target.value }));
            }}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => {
              dispatch(setProductParams({ brands: items }));
            }}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => {
              dispatch(setProductParams({ types: items }));
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={productList} />
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9}>
        {metaData && (
          <PaginationApp
            metaData={metaData}
            onPageChange={(page) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Catalog;
