import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { Basket } from '../../app/models/Basket';
import { getCookie } from '../../app/uti/utilities';

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: '',
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
  'basket/fetchBasketAsync',
  async (_, thunkApi) => {
    try {
      return await agent.Basket.get();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie('buyerId')) return false;
    },
  }
);

export const addItemToBasketAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>('basket/addItemToBasket', async ({ productId, quantity = 1 }, thunkApi) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const removeItemFromBasket = createAsyncThunk<
  Basket,
  { productId: number; quantity: number; name?: string }
>(
  'basket/removeItemFromBasket',
  async ({ productId, quantity = 1 }, thunkApi) => {
    try {
      return await agent.Basket.removeItem(productId, quantity);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const basketSilice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToBasketAsync.pending, (state, action) => {
      const id = action.meta.arg.productId;
      state.status = `pendingAddItem${id}`;
    });

    builder.addCase(removeItemFromBasket.pending, (state, action) => {
      const { productId, name } = action.meta.arg;
      state.status = `pendingRemoveItem${productId}${name}`;
    });
    builder.addCase(removeItemFromBasket.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;

      const removedItemIndex = state.basket?.items.findIndex(
        (item) => item.productId === productId
      );

      if (removedItemIndex === -1 || removedItemIndex === undefined) return;

      state.basket!.items[removedItemIndex].quantity -= quantity;

      if (state.basket!.items[removedItemIndex].quantity <= 0) {
        state.basket?.items.splice(removedItemIndex, 1);
      }

      state.status = 'idle';
    });
    builder.addCase(removeItemFromBasket.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });

    builder.addMatcher(
      isAnyOf(addItemToBasketAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = 'idle';
      }
    );
    builder.addMatcher(
      isAnyOf(addItemToBasketAsync.rejected, fetchBasketAsync.rejected),
      (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
      }
    );
  },
});

export const { setBasket, clearBasket } = basketSilice.actions;
