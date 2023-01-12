import { Button, Grid, List, ListItem, Paper, Stack, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategorySelectView from '../addTransactionPage/CategorySelectView'
import LoadingPage from '../LoadingPage'
import RulesList from './RulesList'
import { addRule, deleteRule } from '../../actions/actionCreators'

const RulesPage = () => {
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState({})
    const handleChange = (evt) => {
        setDescription(() => evt.target.value)
    }
    const handleCategoryClick = (category) => {
        setCategory(category)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const newRule = {contains: description, bankly_category: category}
        console.log("rules", newRule)
        setDescription('')
        setCategory({})
        dispatch(addRule(newRule))
    }
    const handleDelete = (containsText) => {
        dispatch(deleteRule(containsText))
    }
    useEffect(() => {
        if (user) {
            if (!user.token) {
                navigate('/')
            }
        }
    }, [])
    if (!user) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <>
            <Container component={Paper} sx={{ mt: 2, mb: 3 }}>
                <h3>Add a new rule</h3>
                <Stack direction="row" justifyContent={"space-around"}>
                    <Stack spacing={2}>
                        <p>If description contains</p>
                        <TextField
                            value={description}
                            name={"description"}
                            onChange={handleChange}
                            variant={"standard"}
                        ></TextField>
                    </Stack>
                    <Stack spacing={2}>
                        <p>Category is</p>
                        <CategorySelectView categories={user.user.categories} handleClick={handleCategoryClick} maxPage={3} selected={category}></CategorySelectView>
                    </Stack>
                </Stack>
                <Button color={'success'} variant={'contained'} onClick={handleSubmit} sx={{m: 2}}>Add</Button>
            </Container>
            <RulesList rules={user.user.rules || []} handleDelete={handleDelete}></RulesList>
        </>

    )
}

export default RulesPage