import { Divider, IconButton, List, ListItem, ListItemText, Paper, Stack } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import CategoryIcon from '../addTransactionPage/CategoryIcon'
import { v4 as uuid } from 'uuid'
import DeleteIcon from '@mui/icons-material/Delete';

const RulesList = ({ rules = [], handleDelete }) => {
    return (
        <Container component={Paper}>
            <h3>Rules</h3>
            <List>
                {
                    rules.map((rule, idx) => {
                        return (

                            <div key={uuid()}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(rule.contains)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <Stack direction="row" alignItems={"center"} spacing={2}>
                                        <CategoryIcon category={rule.bankly_category}></CategoryIcon>
                                        <ListItemText primary={`${rule.contains}`}></ListItemText>
                                    </Stack>
                                    
                                </ListItem>
                                {idx === rules.length - 1 ? null : <Divider></Divider>}
                            </div>
                        )
                    })
                }
            </List>
        </Container>
    )
}

export default RulesList