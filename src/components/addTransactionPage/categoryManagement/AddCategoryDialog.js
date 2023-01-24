import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import CategorySelectView from '../CategorySelectView';
import { MuiColorInput } from 'mui-color-input';
import { Stack } from '@mui/system';
import CategoryIcon from '../CategoryIcon';
import { v4 as uuid } from 'uuid';

function AddCategoryDialog({ open, setOpen, handleAdd }) {

    const handleClose = () => {
        setOpen(false);
    };

    const makeDefaultCategories = (color) => {
        let availableCategories = []
        for (let i = 0; i < 20; i++) {
            availableCategories.push({ iconId: i, color: color })
        }
        return availableCategories
    }

    const [color, setColor] = useState('#2C87C9')
    const [categories, setCategories] = useState(() => {
        return makeDefaultCategories('#2C87C9')
    })
    const handleColorChange = (color) => {
        setColor(color)
        setCategories(() => makeDefaultCategories(color))
        setSelectedIcon((icon) => { return { ...icon, color: color } })
    }



    const [categoryDescription, setDescription] = useState('')

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }

    const [selectedIcon, setSelectedIcon] = useState(() => {
        return { iconId: 0, color: color }
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (categoryDescription.length > 0) {
            const category = { ...selectedIcon, name: categoryDescription, id: uuid() }
            handleAdd(category)
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
                <DialogTitle id="logout-dialog-title">Add a Category</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: '5px' }}>
                        <TextField
                            label={'Description'}
                            name={'categoryDescription'}
                            value={categoryDescription}
                            onChange={handleDescriptionChange}
                        ></TextField>
                        <MuiColorInput value={color} onChange={handleColorChange}></MuiColorInput>
                        <Stack spacing={1} direction='row'>
                            <Typography variant={'h6'}>Icon: </Typography>
                            <CategoryIcon handleClick={() => { }} category={selectedIcon}></CategoryIcon>
                        </Stack>
                        <CategorySelectView categories={categories} handleClick={setSelectedIcon}></CategorySelectView>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={'contained'} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} type={'submit'} variant={'contained'} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCategoryDialog
