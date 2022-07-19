import { Box, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const Footer = () => {
  return (
    <Box bgcolor='text.secondary' color='white' px='16px' py='24px' mt={4}>
      <Container>
        <Grid container spacing={8} pt={3}>
          <Grid item xs={4}>
            <Box borderBottom={1} style={{ fontWeight: 500, fontSize: '20px' }}>
              Help
            </Box>
            <Box>
              <Link to='/' style={linkStyle}>
                About
              </Link>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box borderBottom={1} style={{ fontWeight: 500, fontSize: '20px' }}>
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
            <Box borderBottom={1} style={{ fontWeight: 500, fontSize: '20px' }}>
              Shopping
            </Box>
            <Box>
              <Link to='/basket' style={linkStyle}>
                Basket
              </Link>
            </Box>
            <Box>
              <Link to='/orders' style={linkStyle}>
                Order
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign='center' pt={3} pb={3}>
          Re-store &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
