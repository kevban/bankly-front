import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import Chart from './Chart';
import useToggle from '../../hooks/useToggle';
import BanklyDrawer from './BanklyDrawer';
import { useDispatch, useSelector } from 'react-redux';
import AddTransactionButton from '../addTransactionPage/AddTransactionButton';
import { useLocation } from 'react-router-dom';
import AddTransactionDrawer from '../addTransactionPage/AddTransactionDrawer';
import AddTransactionPage from '../addTransactionPage/AddTransactionPage';





const BanklyAppBar = () => {
  const user = useSelector(store => store.auth.user ? store.auth.user.token : null)
  const location = useLocation()
  const pathname = location.pathname
  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...((open && user) && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));



  const [appBarTitle, setAppBarTtitle] = React.useState('Bank.ly')
  const [open, toggleDrawer] = useToggle(false);
  const [transactionFab, setTransactionFab] = useState(false);
  useEffect(() => {
    const routesToShowFab = ['/dashboard', '/transactions']
    if (routesToShowFab.includes(pathname)) {
      setTransactionFab(true)
    } else {
      setTransactionFab(false)
    }
  }, [pathname])
  return <>
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        {user ? <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton> : null}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {appBarTitle}
        </Typography>
      </Toolbar>
    </AppBar>
    {user ? <>
      <BanklyDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
      ></BanklyDrawer>
    </> : null}
    {transactionFab ? <AddTransactionDrawer></AddTransactionDrawer> : null}
  </>
}

export default BanklyAppBar

