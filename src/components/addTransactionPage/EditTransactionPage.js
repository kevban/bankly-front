import { TextField, Paper, Select, Chip, MenuItem, InputLabel, FormControl, Grid, Pagination, InputAdornment, Button, Input, List, Stack, Dialog, ListItemIcon, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCategoryDialog from './categoryManagement/AddCategoryDialog'
import CategorySelectView from './CategorySelectView'
import {
    addCategory as addCategoryAction,
    removeCategory as removeCategoryAction,
    addTag as addTagAction,
    removeTag as removeTagAction,
    editTransction as editTransactionAction,
    deleteTransaction as deleteTransactionAction
} from '../../actions/actionCreators'
import RemoveCategoryDialog from './categoryManagement/RemoveCategoryDialog'
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuid } from 'uuid'
import CategoryIcon from './CategoryIcon'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const EditTransactionPage = () => {
    const { id } = useParams()
    const user = useSelector(store => store.auth.user)
    const transaction = useSelector(store => user ? store.auth.user.transactions.find(val => val.transaction_id === id) : {});
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
        const transactionObj = {
            transaction_id: transaction.transaction_id,
            ...values
        }
        dispatch(editTransactionAction(transactionObj))
        navigate('/')
    }

    const handleDelete = () => {
        dispatch(deleteTransactionAction(transaction.transaction_id))
        navigate('/')
    }



    const addTag = (evt) => {
        evt.stopPropagation();
        if (evt.keyCode === 13) {
            dispatch(addTagAction(evt.target.value))
            evt.target.value = ''
        }
    }

    const removeTag = (evt, name) => {
        evt.stopPropagation()
        formik.values.category = formik.values.category.filter(val => val !== name)
        dispatch(removeTagAction(name))
    }

    const addCategory = (category) => {
        dispatch(addCategoryAction(category))
    }

    const removeCategory = (category) => {
        dispatch(removeCategoryAction(category.id))
    }

    const formik = useFormik({
        initialValues: {
            amount: transaction ? transaction.amount : '',
            date: transaction ? transaction.date : moment().format('YYYY-MM-DD'),
            name: transaction ? transaction.name : '',
            category: transaction ? transaction.category : [], // this is actually tags. It is named category to integrate w/ plaid
            bankly_category: transaction ? transaction.bankly_category : user.user.categories[0], // this is the actually category
            account_name: transaction ? transaction.account_name : 'Cash'
        },
        onSubmit: handleSubmit
    })

    const handleTagSelect = (event) => {
        formik.setFieldValue('category', event.target.value);
    };

    const handleCategorySelect = (category) => {
        formik.setFieldValue('bankly_category', category);
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

    const [openAddCategory, setOpenAddCategory] = useState(false)
    const [openRemoveCategory, setOpenRemoveCategory] = useState(false)


    if (!user) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <Container component={Paper} sx={{ mt: '40px', p: '20px', display: 'flex', flexDirection: 'column' }} >
            <h1>Edit Transaction</h1>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            label={'Amount'}
                            placeholder={'Transaction amount'}
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            disabled={!!transaction.account_id}
                            name={'amount'}
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
                            disabled={!!transaction.account_id}
                            onChange={formik.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CategorySelectView categories={user.user.categories} selected={formik.values.bankly_category} handleClick={handleCategorySelect}></CategorySelectView>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack spacing={1}>
                            <Button variant='outlined' sx={{ maxWidth: '128px' }} onClick={() => {
                                setOpenAddCategory(true)
                            }}><AddIcon></AddIcon></Button>
                            <Button variant='outlined' sx={{ maxWidth: '128px' }} onClick={() => {
                                setOpenRemoveCategory(true)
                            }}><RemoveIcon></RemoveIcon></Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={'Description'}
                            placeholder={'Enter a short description of the transaction ...'}
                            value={formik.values.name}
                            disabled={!!transaction.account_id}
                            InputLabelProps={{ shrink: true }}
                            onChange={formik.handleChange}
                            name={'name'}
                            fullWidth
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="category-label">Tags</InputLabel>
                        <Select
                            labelId="tags-label"
                            id="category"
                            multiple
                            value={formik.values.category}
                            onChange={handleTagSelect}
                            inputProps={{
                                name: 'category',
                                id: 'category-multiple',
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
                            {user.user.tags.map(val => {
                                return <MenuItem value={val} sx={{ px: 2 }} key={uuid()}>{val}
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                                        onClick={(evt) => {
                                            removeTag(evt, val)
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </MenuItem>
                            })}
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
                    <Grid item xs={12}>
                        <TextField
                            label={'Account'}
                            placeholder={'Enter the name of the bank account'}
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.account_name}
                            onChange={formik.handleChange}
                            name={'account_name'}
                            disabled={!!transaction.account_id}
                            fullWidth
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction='row' sx={{ mt: '10px', mx: 'auto' }} justifyContent={'center'}>
                            <Button onClick={() => navigate('/')} variant='contained' color="secondary" >Cancel</Button>
                            <Button onClick={handleDelete} variant='contained' color="error" disabled={!!transaction.account_id}>Delete</Button>
                            <Button type={'submit'} variant='contained'>Save</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        {transaction.account_id ? <p>* Some fields cannot be changed for imported transactions!</p> : null}
                    </Grid>
                </Grid>
            </form>
            <AddCategoryDialog open={openAddCategory} setOpen={setOpenAddCategory} handleAdd={addCategory}></AddCategoryDialog>
            <RemoveCategoryDialog open={openRemoveCategory} setOpen={setOpenRemoveCategory} handleRemove={removeCategory} categories={user.user.categories}></RemoveCategoryDialog>
        </Container>
    )
}

export default EditTransactionPage