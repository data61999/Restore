import { Remove, Add, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { BasketItem } from '../../app/models/Basket';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeItemFromBasket, addItemToBasketAsync } from './basketSlice';

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='right'>SubTotal</TableCell>
            {isBasket && <TableCell align='right'></TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {item.name}
              </TableCell>

              <TableCell align='right'>
                ${(item.price / 100).toFixed(2)}
              </TableCell>

              <TableCell align='right'>
                {isBasket && (
                  <LoadingButton
                    loading={status.includes(
                      `pendingRemoveItem${item.productId}rem`
                    )}
                    color='error'
                    onClick={() =>
                      dispatch(
                        removeItemFromBasket({
                          productId: item.productId,
                          quantity: 1,
                          name: 'rem',
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                )}

                {item.quantity}

                {isBasket && (
                  <LoadingButton
                    loading={status.includes(`pendingAddItem${item.productId}`)}
                    color='secondary'
                    onClick={() =>
                      dispatch(
                        addItemToBasketAsync({
                          productId: item.productId,
                        })
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>

              <TableCell align='right'>
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>

              {isBasket && (
                <TableCell align='right'>
                  <LoadingButton
                    color='error'
                    loading={status.includes(
                      `pendingRemoveItem${item.productId}del`
                    )}
                    onClick={() =>
                      dispatch(
                        removeItemFromBasket({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: 'del',
                        })
                      )
                    }
                  >
                    <Delete></Delete>
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
