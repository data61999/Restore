import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { PaginatedList } from '../models/Pagination';
import { store } from '../store/configureStore';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const requestBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedList(response.data, JSON.parse(pagination));
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }

          throw modalStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        history.push({
          pathname: '/server-error',
          state: { error: data },
        });
        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(requestBody),
  post: (url: string, body: {}) => axios.post(url, body).then(requestBody),
  put: (url: string, body: {}) => axios.put(url, body).then(requestBody),
  delete: (url: string) => axios.delete(url).then(requestBody),
};

const Catalog = {
  list: (params: URLSearchParams) => request.get('products', params),
  detail: (id: number) => request.get(`products/${id}`),
  filters: () => request.get('products/filters'),
};

const TestError = {
  get400Error: () => request.get('buggy/bad-request'),
  get401Error: () => request.get('buggy/unauthorise'),
  get404Error: () => request.get('buggy/not-found'),
  get500Error: () => request.get('buggy/server-error'),
  getValidationError: () => request.get('buggy/validation-error'),
};

const Basket = {
  get: () => request.get('basket'),
  addItem: (productId: number, quantity: number = 1) =>
    request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity: number = 1) =>
    request.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (value: any) => request.post('/account/login', value),
  register: (value: any) => request.post('/account/register', value),
  getCurrentUser: () => request.get('/account/currentUser'),
  getUserAddress: () => request.get('/account/getUserAddress'),
};

const Orders = {
  list: () => request.get('/orders'),
  fetch: (id: number) => request.get(`/orders/${id}`),
  create: (values: any) => request.post('/orders', values),
};

const agent = {
  Catalog,
  TestError,
  Basket,
  Account,
  Orders,
};

export default agent;
