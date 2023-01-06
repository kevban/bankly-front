import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function LogoutDialog({open, setOpen, handleLogOut}) {

  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    handleLogOut()
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={logOut} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LogoutDialog
