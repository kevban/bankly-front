import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import Chart from './Chart';
import useToggle from '../../hooks/useToggle';
import BanklyDrawer from './BanklyDrawer';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AddTransactionDrawer from '../addTransactionPage/AddTransactionDrawer';
import { useMediaQuery } from '@mui/material';





const BanklyAppBar = () => {
  const user = useSelector(store => store.auth.user ? store.auth.user.token : null)
  const smallScreen = useMediaQuery('(max-width:800px)')
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
    ...((open && user && !smallScreen) && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));



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
            position: 'absolute',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton> : null}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          sx={{flexGrow: 1, textAlign: 'center'}}
          noWrap
        >
          Bank.ly
        </Typography>
      </Toolbar>
    </AppBar>
    {user ? <>
      <BanklyDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
        type={smallScreen? 'temporary': 'permanent'}
      ></BanklyDrawer>
    </> : null}
    {transactionFab ? <AddTransactionDrawer></AddTransactionDrawer> : null}
  </>
}

export default BanklyAppBar

