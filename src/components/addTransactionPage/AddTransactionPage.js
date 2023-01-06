import { TextField, Paper, Select, Chip, MenuItem, InputLabel, FormControl, Grid, Pagination, InputAdornment, Button, Input, List, Stack, Dialog } from '@mui/material'
import { Container } from '@mui/system'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from './CategoryIcon'
import usePagination from '../../hooks/usePagination'
import AddCategoryDialog from './AddCategoryDialog'
import CategorySelectView from './CategorySelectView'
import { addCategory as addCategoryAction } from '../../actions/actionCreators'



const AddTransactionPage = ({ closeDrawer }) => {
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            if (!user.token) {
                navigate('/')
            }
        }
    }, [])


    const handleSubmit = (values) => {
        console.log('submitted', values)
        closeDrawer({})
    }

    const addTag = (evt) => {
        if (evt.keyCode === 13) {
            console.log('Added tag: ', evt.target.value)
            dispatch()
        }
    }

    const addCategory = (category) => {
        dispatch(addCategoryAction(category))
    }

    const formik = useFormik({
        initialValues: {
            amt: '',
            date: moment().format('YYYY-MM-DD'),
            description: '',
            tags: [],
            category: user.user.categories[0]
        },
        onSubmit: handleSubmit
    })

    const handleTagSelect = (event) => {
        formik.setFieldValue('tags', event.target.value);
    };

    const handleCategorySelect = (category) => {
        formik.setFieldValue('category', category);
    }

    



    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [open, setOpen] = useState(false)
    

    if (!user) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <Container sx={{ mt: '40px', p: '20px', display: 'flex', flexDirection: 'column' }} >
            <h1>Add a Transaction</h1>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            label={'Amount'}
                            placeholder={'Transaction amount'}
                            value={formik.values.amt}
                            onChange={formik.handleChange}
                            name={'amt'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            fullWidth
                        ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="date"
                            label="Transaction Date"
                            name="date"
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <CategorySelectView categories={user.user.categories} selected={formik.values.category} handleClick={handleCategorySelect}></CategorySelectView>
                        
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant='outlined' sx={{ maxWidth: '128px' }} onClick={() => {
                            setOpen(true)
                        }}>Add Categories</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={'Description'}
                            placeholder={'Enter a short description of the transaction ...'}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            name={'description'}
                            fullWidth
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="tags-label">Tags</InputLabel>
                        <Select
                            labelId="tags-label"
                            id="tags"
                            multiple
                            value={formik.values.tags}
                            onChange={handleTagSelect}
                            inputProps={{
                                name: 'tags',
                                id: 'tags-multiple',
                            }}
                            fullWidth
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} sx={{ mx: '2px' }} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value="category1">Category 1</MenuItem>
                            <MenuItem value="category2">Category 2</MenuItem>
                            <MenuItem value="category3">Category 3</MenuItem>
                            <TextField
                                id='addTag'
                                name='addTag'
                                onKeyDown={addTag}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AddIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ p: 2 }}
                                variant="standard" fullWidth></TextField>
                        </Select>
                    </Grid>
                </Grid>
                <Button type={'submit'} variant='contained' sx={{ mt: '10px' }}>Add</Button>
            </form>
            <AddCategoryDialog open={open} setOpen={setOpen} handleAdd={addCategory}></AddCategoryDialog>
        </Container>
    )
}

export default AddTransactionPage