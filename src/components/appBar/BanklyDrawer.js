import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems, SecondaryListItems } from './ListItem'
import Drawer from '@mui/material/Drawer';

// import Chart from './Chart';

const BanklyDrawer = ({ open, toggleDrawer, drawerWidth, type }) => {

  const PermanentDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  return (type === 'permanent' ? <PermanentDrawer
    variant={type}
    open={open}
  >
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      <MainListItems />
      <Divider sx={{ my: 1 }} />
      <SecondaryListItems />
    </List>
  </PermanentDrawer> :
    <Drawer
      variant={type}
      open={open}
      onClose={toggleDrawer}
    >
      <Toolbar />
      <Divider />
      <List component="nav">
        <MainListItems />
        <Divider sx={{ my: 1 }} />
        <SecondaryListItems />
      </List>
    </Drawer>
  )
}

export default BanklyDrawer