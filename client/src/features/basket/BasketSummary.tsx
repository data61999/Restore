import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/uti/utilities';

interface Props {
  subtotal?: number;
}

export default function BasketSummary({ subtotal }: Props) {
  const DELIVERY_FEE = 500;
  const BORDER_FEE = 10000;

  const { basket } = useAppSelector((state) => state.basket);

  if (subtotal === undefined) {
    subtotal =
      basket?.items.reduce(
        (sum, item) => (sum += item.price * item.quantity),
        0
      ) || 0;
  }
  const deliveryFee = subtotal >= BORDER_FEE ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align='right'>{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align='right'>{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>{currencyFormat(total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: 'italic' }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
