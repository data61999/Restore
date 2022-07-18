import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import agent from '../../app/api/agent';
import { Product } from '../../app/models/Product';
import ProductItem from '../catalog/ProductItem';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.nomalList()
      .then((products) => setProducts(products.items))
      .catch((error) => console.log(error));
  }, []);

  const settings = {
    dots: true,
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
      <Slider {...settings}>
        <div>
          <img
            src='/images/banner_1.png'
            alt='hero'
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </div>
        <div>
          <img
            src='/images/banner_2.png'
            alt='hero'
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </div>
        <div>
          <img
            src='/images/banner_3.png'
            alt='hero'
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </div>
      </Slider>

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
  );
};

export default HomePage;
