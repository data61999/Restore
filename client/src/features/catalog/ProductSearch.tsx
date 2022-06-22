import { debounce, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm || '');

  const debounceSearch = debounce((event) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 500);

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
