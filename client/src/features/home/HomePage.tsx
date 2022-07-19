<<<<<<< Updated upstream
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import agent from '../../app/api/agent';
import { Product } from '../../app/models/Product';
=======
import { Button, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import agent from '../../app/api/agent';
import { Product } from '../../app/models/Product';
import ProductCardSkeleton from '../catalog/ProductCardSkeleton';
>>>>>>> Stashed changes
import ProductItem from '../catalog/ProductItem';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
<<<<<<< Updated upstream

  useEffect(() => {
    agent.Catalog.nomalList()
      .then((products) => setProducts(products.items))
      .catch((error) => console.log(error));
=======
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    agent.Catalog.homepageList()
      .then((products) => setProducts(products.items))
      .catch((error) => console.log(error))
      .finally(() => setLoading(true));
>>>>>>> Stashed changes
  }, []);

  const settings = {
    dots: true,
<<<<<<< Updated upstream
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='homepage'>
=======
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
>>>>>>> Stashed changes
      <Slider {...settings}>
        <div>
          <img
            src='/images/banner_1.png'
<<<<<<< Updated upstream
            alt='hero'
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
=======
            alt='banner_1'
            style={{ display: 'block', maxHeight: 500, width: '100%' }}
>>>>>>> Stashed changes
          />
        </div>
        <div>
          <img
            src='/images/banner_2.png'
<<<<<<< Updated upstream
            alt='hero'
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
=======
            alt='banner_2'
            style={{ display: 'block', maxHeight: 500, width: '100%' }}
>>>>>>> Stashed changes
          />
        </div>
        <div>
          <img
            src='/images/banner_3.png'
<<<<<<< Updated upstream
            alt='hero'
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
=======
            alt='banner_3'
            style={{ display: 'block', maxHeight: 500, width: '100%' }}
>>>>>>> Stashed changes
          />
        </div>
      </Slider>

<<<<<<< Updated upstream
      <Container>
        <Box mt={4}>
          <Typography variant='h4' sx={{ fontStyle: 'italic' }}>
            What's trending
          </Typography>
          <Grid container spacing={4} sx={{ pt: 1, mb: 4 }}>
            {products.length > 0 &&
              products.map((product) => (
                <Grid item xs={3} key={product.id}>
                  {<ProductItem product={product} />}
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </div>
=======
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
>>>>>>> Stashed changes
  );
};

export default HomePage;
