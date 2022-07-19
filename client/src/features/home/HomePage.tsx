import { Button, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import agent from '../../app/api/agent';
import { Product } from '../../app/models/Product';
import ProductCardSkeleton from '../catalog/ProductCardSkeleton';
import ProductItem from '../catalog/ProductItem';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    agent.Catalog.homepageList()
      .then((products) => setProducts(products.items))
      .catch((error) => console.log(error))
      .finally(() => setLoading(true));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            src='/images/banner_1.png'
            alt='banner_1'
            style={{ display: 'block', maxHeight: 500, width: '100%' }}
          />
        </div>
        <div>
          <img
            src='/images/banner_2.png'
            alt='banner_2'
            style={{ display: 'block', maxHeight: 500, width: '100%' }}
          />
        </div>
        <div>
          <img
            src='/images/banner_3.png'
            alt='banner_3'
            style={{ display: 'block', maxHeight: 500, width: '100%' }}
          />
        </div>
      </Slider>

      <Container sx={{ mt: 4, mb: 6 }}>
        <Box
          mb={4}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          // textAlign='justify'
        >
          <Typography>Adidas Ultra Boost</Typography>
          <Typography variant='h3' sx={{ fontWeight: '700' }}>
            BUILD TO RAISE THE BAR
          </Typography>
          <Typography variant='h6'>
            Your Ultimate Strength Training Partner
          </Typography>
          <Button
            variant='outlined'
            component={Link}
            to='/catalog/2'
            sx={{ mt: 1 }}
          >
            Shop
          </Button>
        </Box>

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h4' style={{ fontWeight: '500' }}>
            Trending
          </Typography>
          <Button
            variant='contained'
            component={Link}
            to='/catalog'
            sx={{ bgColor: 'primary' }}
          >
            See more
          </Button>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={3} key={product.id}>
              {!loading ? (
                <ProductCardSkeleton key={product.id} />
              ) : (
                <ProductItem product={product} />
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
