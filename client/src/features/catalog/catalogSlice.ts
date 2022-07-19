import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { MetaData } from '../../app/models/Pagination';
import { Product, ProductParams } from '../../app/models/Product';
import { RootState } from '../../app/store/configureStore';

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams = (urlSearhParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append('pageNumber', urlSearhParams.pageNumber.toString());
  params.append('pageSize', urlSearhParams.pageSize.toString());
  params.append('orderBy', urlSearhParams.orderBy);
  if (urlSearhParams.searchTerm)
    params.append('searchTerm', urlSearhParams.searchTerm);
  if (urlSearhParams.brands.length > 0) {
    params.append('brands', urlSearhParams.brands.toString());
  }
  if (urlSearhParams.types.length > 0) {
    params.append('types', urlSearhParams.types.toString());
  }
  return params;
};

export const fetchProductListAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('catalog/fetchProductList', async (_, thunkApi) => {
  const params = getAxiosParams(thunkApi.getState().catalog.productParams);
  try {
    const response = await agent.Catalog.list(params);
    thunkApi.dispatch(setMetaData(response.metaData));

    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProduct',
  async (productId, thunkApi) => {
    try {
      return await agent.Catalog.detail(productId);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error });
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  'catalog/fetchFilters',
  async (_, thunkApi) => {
    try {
      return await agent.Catalog.filters();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

const initParams = () => ({
  orderBy: 'name',
  pageNumber: 1,
  pageSize: 6,
  brands: [],
  types: [],
});

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: '',
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    resetProductParams: (state) => {
      state.productsLoaded = false;
      state.productParams = initParams();
      state.productsLoaded = false;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
      // state.productsLoaded = false;
    },
    setProduct: (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.productsLoaded = false;
    },
<<<<<<< Updated upstream
    deleteProduct: (state, action) => {
=======
    removeProduct: (state, action) => {
>>>>>>> Stashed changes
      productsAdapter.removeOne(state, action.payload);
      state.productsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductListAsync.pending, (state) => {
      state.status = 'pendingFetchProductList';
    });
    builder.addCase(fetchProductListAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.productsLoaded = true;
      state.status = 'idle';
    });
    builder.addCase(fetchProductListAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
    builder.addCase(fetchProductAsync.pending, (state, action) => {
      state.status = 'pendingFetchProduct';
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
    // fetch filter
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = 'pendingFetchFiters';
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.filtersLoaded = true;
      state.brands = action.payload.brands;
      state.types = action.payload.types;
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
  },
});

export const productsSelector = productsAdapter.getSelectors<RootState>(
  (state) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
  setProduct,
<<<<<<< Updated upstream
  deleteProduct,
=======
  removeProduct,
>>>>>>> Stashed changes
} = catalogSlice.actions;
