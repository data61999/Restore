import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const Footer = () => {
  return (
    <Box
      px={{ xs: 3 }}
      py={{ xs: 3 }}
      mt={2}
      bgcolor='text.secondary'
      color='white'
    >
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Box borderBottom={1} fontWeight='600'>
              Help
            </Box>
            <Box>
              <Link to='/about' style={linkStyle}>
                About
              </Link>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box borderBottom={1} fontWeight='600'>
              Account
            </Box>
            <Box>
              <Link to='/login' style={linkStyle}>
                Login
              </Link>
            </Box>
            <Box>
              <Link to='/register' style={linkStyle}>
                Register
              </Link>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box borderBottom={1} fontWeight='600'>
              Shopping
            </Box>
            <Box>
              <Link to='/basket' style={linkStyle}>
                Cart
              </Link>
            </Box>
            <Box>
              <Link to='/order' style={linkStyle}>
                Order
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
