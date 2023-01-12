import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Typography } from '@mui/material';
import CategorySelectView from '../CategorySelectView';
import { MuiColorInput } from 'mui-color-input';
import { Stack } from '@mui/system';
import CategoryIcon from '../CategoryIcon';

function RemoveCategoryDialog({ open, setOpen, handleRemove, categories }) {

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedCategory, setSelectedCategory] = useState({}); 

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (selectedCategory) {
            handleRemove(selectedCategory)
            setOpen(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="logout-dialog-title"
                fullWidth
            >
                <DialogTitle id="logout-dialog-title">Remove a Category</DialogTitle>
                <DialogContent>
                    <CategorySelectView categories={categories.filter(val => val.id)} handleClick={setSelectedCategory} selected={selectedCategory}></CategorySelectView>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={'contained'} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} type={'submit'} variant={'contained'} color="primary">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RemoveCategoryDialog
