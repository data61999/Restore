import { useEffect } from 'react';
import {
  productsSelector,
  fetchProductListAsync,
  fetchFiltersAsync,
} from '../../features/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productsSelector.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metaData } =
    useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductListAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  return {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    products,
    metaData,
  };
};

export default useProducts;
