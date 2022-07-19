<<<<<<< Updated upstream
import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
=======
import { Box, Container, Grid } from '@mui/material';
>>>>>>> Stashed changes
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const Footer = () => {
  return (
<<<<<<< Updated upstream
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
=======
    <Box bgcolor='text.secondary' color='white' px='16px' py='24px' mt={4}>
      <Container>
        <Grid container spacing={8} pt={3}>
          <Grid item xs={4}>
            <Box borderBottom={1} style={{ fontWeight: 500, fontSize: '20px' }}>
              Help
            </Box>
            <Box>
              <Link to='/' style={linkStyle}>
>>>>>>> Stashed changes
                About
              </Link>
            </Box>
          </Grid>

          <Grid item xs={4}>
<<<<<<< Updated upstream
            <Box borderBottom={1} fontWeight='600'>
=======
            <Box borderBottom={1} style={{ fontWeight: 500, fontSize: '20px' }}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            <Box borderBottom={1} fontWeight='600'>
=======
            <Box borderBottom={1} style={{ fontWeight: 500, fontSize: '20px' }}>
>>>>>>> Stashed changes
              Shopping
            </Box>
            <Box>
              <Link to='/basket' style={linkStyle}>
<<<<<<< Updated upstream
                Cart
              </Link>
            </Box>
            <Box>
              <Link to='/order' style={linkStyle}>
=======
                Basket
              </Link>
            </Box>
            <Box>
              <Link to='/orders' style={linkStyle}>
>>>>>>> Stashed changes
                Order
              </Link>
            </Box>
          </Grid>
        </Grid>
<<<<<<< Updated upstream
=======
        <Box textAlign='center' pt={3} pb={3}>
          Re-store &reg; {new Date().getFullYear()}
        </Box>
>>>>>>> Stashed changes
      </Container>
    </Box>
  );
};

export default Footer;
