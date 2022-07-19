import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  // { title: 'contact', path: '/contact' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

const navLinkStyle = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': {
    color: 'grey.500',
  },
  '&:active': {
    color: 'text.secondary',
  },
};

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount =
    basket?.items.reduce((sum, item) => (sum += item.quantity), 0) || 0;

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant='h5' component={NavLink} to='/' sx={navLinkStyle}>
            Re-store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navLinkStyle}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
          {user && user.roles?.includes('Admin') && (
            <ListItem component={NavLink} to={'/inventory'} sx={navLinkStyle}>
              INVENTORY
            </ListItem>
          )}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton
            component={Link}
            to='/basket'
            size='large'
            sx={{ color: 'inherit' }}
          >
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navLinkStyle}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
