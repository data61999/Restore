import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../features/account/accountSlice';
import { catalogSlice } from '../../features/catalog/catalogSlice';
import { basketSilice } from '../../features/basket/basketSlice';

export const store = configureStore({
  reducer: {
    basket: basketSilice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
