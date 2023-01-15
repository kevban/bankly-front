import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logOut } from '../../actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutDialog from './LogoutDialog';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';

const MainListItems = () => {
  const navigate = useNavigate()
  const handleClick = (route) => {
    navigate(`/${route}`)
  }
  return (
    <>
    <ListItemButton onClick={() => handleClick('dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => handleClick('transactions')}>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
    
    <ListItemButton onClick={() => handleClick('rules')}>
      <ListItemIcon>
        <RuleFolderIcon />
      </ListItemIcon>
      <ListItemText primary="Rules" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Charts" />
    </ListItemButton> */}
    </>
  )
}

const SecondaryListItems = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }
  const handleClick = (route) => {
    navigate(`/${route}`)
  }

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ListItemButton onClick={() => handleClick('connect')}>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Connect to Banks" />
    </ListItemButton>
      <ListItemButton onClick={() => setOpen(true)}>
        <ListItemIcon>
          <PowerSettingsNewIcon color='error' />
        </ListItemIcon>
        <ListItemText primary="Log Out" primaryTypographyProps={{
          color: 'error',
        }} />
      </ListItemButton>
      <LogoutDialog open={open} setOpen={setOpen} handleLogOut={handleLogOut}/>
    </>
  )
}

export {MainListItems, SecondaryListItems}