import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../../app/api/agent';
import { User } from '../../app/models/User';
import { setBasket } from '../basket/basketSlice';

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInAsync = createAsyncThunk<User, FieldValues>(
  'account/signin',
  async (data, thunkApi) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) thunkApi.dispatch(setBasket(basket));

      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUserAsync = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkApi) => {
    thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const userDto = await agent.Account.getCurrentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkApi.dispatch(setBasket(basket));

      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      history.push('/login');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserAsync.rejected, (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired - please login again');
      history.push('/');
    });

    builder.addCase(signInAsync.rejected, (state, action) => {
      const error = action.payload;
      console.log(error);
    });

    builder.addMatcher(
      isAnyOf(signInAsync.fulfilled, fetchCurrentUserAsync.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;
