import React from 'react';
import { Link } from 'react-router-dom';
import { useDB } from '../../data';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';

// Material-UI Components
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('xs')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    links: {
      textDecoration: 'none',
    },
  })
);

const Navigation = () => {
  const { user } = useDB();

  return <div>{user ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.links} to={ROUTES.ACCOUNT}>
          My Account
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <SignOutButton />
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            <Link className={classes.links} to={ROUTES.HOME}>
              Mukbang Party
            </Link>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 1 new notifications' color='inherit'>
              <Badge badgeContent={1} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

const NavigationNonAuth = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            <Link className={classes.links} to={ROUTES.LANDING}>
              Mukbang Party
            </Link>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link className={classes.links} to={ROUTES.SIGN_IN}>
              Sign In
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
