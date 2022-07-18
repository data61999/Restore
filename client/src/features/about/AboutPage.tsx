import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const storeMap = [
  '1xx Khuông Việt P.Phú Trung Q.Tân Phú',
  '3xx/9x Trần Hưng Đạo Q.1',
  '4xx Phan Xích Long P.3 Q.Phú Nhuận',
  '2x/5 Tô Hiến Thành Q.10',
  '9x Lê Văn Thọ, Q.Gò Vấp',
];

const AboutPage = () => {
  // const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // const getValidationErrors = () => {
  //   agent.TestError.getValidationError()
  //     .then(() => console.log('should not see it'))
  //     .catch((errors) => setValidationErrors(errors));
  // };

  return (
    <Container>
      <Typography gutterBottom variant='h3'>
        For testing purposes
      </Typography>
      <Box display='flex' alignItems='center'>
        <Button
          variant='contained'
          color='success'
          component={Link}
          to='/inventory'
          sx={{ mr: 2 }}
        >
          Go To Admin Page
        </Button>
        <Typography>
          <b>
            <i>Username</i>
          </b>
          : Admin -{' '}
          <b>
            <i>Password</i>
          </b>
          : Pa$$w0rd
        </Typography>
      </Box>
      {/* <ButtonGroup fullWidth>
        <Button
          variant='contained'
          onClick={() =>
            agent.TestError.get400Error().catch((error) => console.log(error))
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            agent.TestError.get401Error().catch((error) => console.log(error))
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            agent.TestError.get404Error().catch((error) => console.log(error))
          }
        >
          Test 404 Error
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            agent.TestError.get500Error().catch((error) => console.log(error))
          }
        >
          Test 500 Error
        </Button>
        <Button variant='contained' onClick={getValidationErrors}>
          Test validation error
        </Button>
      </ButtonGroup>

      {validationErrors.length > 0 && (
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )} */}

      <Divider sx={{ m: 2 }} />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        sx={{ mb: 2 }}
      >
        <Typography variant='h3' align='justify' sx={{ mb: 2 }}>
          Re-store always in style!
        </Typography>
        <Typography align='justify'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt vero
          cum, perspiciatis debitis ex unde, alias placeat, porro tempore quas
          recusandae. Omnis sapiente maxime non ratione sint corrupti est dolor.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt vero
          cum, perspiciatis debitis ex unde, alias placeat, porro tempore quas
          recusandae. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Sunt vero cum, perspiciatis debitis ex unde, alias placeat, porro
          tempore quas recusandae. Omnis sapiente maxime non ratione sint
          corrupti est dolor.
        </Typography>
      </Box>
      <List>
        <Typography variant='h6'>Store List:</Typography>
        {storeMap.map((address) => (
          <ListItem key={address} sx={{ p: 0 }}>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemIcon>
                <ArrowRightIcon sx={{ w: 24 }} />
              </ListItemIcon>
              <ListItemText>{address}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AboutPage;
