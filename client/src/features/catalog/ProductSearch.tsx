import { debounce, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm || '');

  const debounceSearch = useCallback(
    debounce((event: any) => {
      dispatch(setProductParams({ searchTerm: event.target.value }));
    }, 700),
    [dispatch]
  );

  return (
    <TextField
      label='Search product'
      variant='outlined'
      fullWidth
      value={searchTerm}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debounceSearch(event);
      }}
    />
  );
};

export default ProductSearch;
