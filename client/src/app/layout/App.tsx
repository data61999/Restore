import { ThemeProvider } from '@emotion/react';
import { Box, Container, CssBaseline } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from '../../features/about/AboutPage';
import { fetchCurrentUserAsync } from '../../features/account/accountSlice';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import InventoryPage from '../../features/admin/inventory/InventoryPage';
import BasketPage from '../../features/basket/BasketPage';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import Catalog from '../../features/catalog/Catalog';
import ProductDetail from '../../features/catalog/ProductDetail';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Orders from '../../features/order/Order';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import { useAppDispatch } from '../store/configureStore';
import Footer from './Footer';
import Header from './Header';
import LoadingComponent from './LoadingComponent';
import PrivateRoute from './PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUserAsync());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <LoadingComponent />;

  return (
    <ThemeProvider theme={theme}>
      <Box minHeight='100vh'>
        <ToastContainer
          position='bottom-right'
          hideProgressBar
          theme='colored'
        />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Container sx={{ mt: 4 }}>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/catalog' component={Catalog} />
                <Route path='/catalog/:id' component={ProductDetail} />
                <Route path='/about' component={AboutPage} />
                <Route path='/contact' component={ContactPage} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/basket' component={BasketPage} />
                <PrivateRoute path='/checkout' component={CheckoutPage} />
                <PrivateRoute path='/orders' component={Orders} />
                <PrivateRoute
                  path='/inventory'
                  roles={['Admin']}
                  component={InventoryPage}
                />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='*' component={NotFound} />
              </Switch>
            </Container>
          )}
        />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
