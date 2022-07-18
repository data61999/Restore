import { Edit, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import agent from '../../../app/api/agent';
import PaginationApp from '../../../app/components/PaginationApp';
import useProducts from '../../../app/hook/useProducts';
import { Product } from '../../../app/models/Product';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/store/configureStore';
import { currencyFormat } from '../../../app/uti/utilities';
import {
  deleteProduct,
  fetchProductListAsync,
  resetProductParams,
  setPageNumber,
} from '../../catalog/catalogSlice';
import ProductForm from './ProductForm';

const InventoryPage = () => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { productList, productsLoaded } = useProducts();
  const { metaData } = useAppSelector((state) => state.catalog);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    dispatch(resetProductParams());
    return () => {
      dispatch(resetProductParams());
      dispatch(setPageNumber({ pageNumber: 1 }));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductListAsync());
  }, [dispatch, productsLoaded]);

  const handleSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(undefined);
    setIsEdit(false);
  };

  const handleDeleteProduct = (id: number) => {
    setLoading(true);
    setTarget(id);

    agent.Admin.deleteProduct(id)
      .then(() => dispatch(deleteProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  if (isEdit)
    return (
      <ProductForm product={selectedProduct} onCancel={handleCancelEdit} />
    );

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography sx={{ p: 2 }} variant='h4'>
          Inventory
        </Typography>
        <Box display='flex'>
          <Button
            sx={{ m: 2 }}
            size='large'
            variant='contained'
            onClick={() => setIsEdit(true)}
          >
            Create
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='left'>Product</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Brand</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {product.id}
                </TableCell>
                <TableCell align='left'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{
                        objectFit: 'contain',
                        height: 50,
                        marginRight: 20,
                        minWidth: 100,
                      }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(product.price)}
                </TableCell>
                <TableCell align='center'>{product.type}</TableCell>
                <TableCell align='center'>{product.brand}</TableCell>
                <TableCell align='center'>{product.quantityInStock}</TableCell>
                <TableCell align='right'>
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectedProduct(product)}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    color='error'
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        {metaData && (
          <PaginationApp
            metaData={metaData}
            onPageChange={(page) => {
              console.log(typeof page);
              dispatch(setPageNumber({ pageNumber: page }));
            }}
          />
        )}
      </Box>
    </>
  );
};

export default InventoryPage;
