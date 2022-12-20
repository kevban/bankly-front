import React, { useState } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {Grid, Button, Stack, Typography, Avatar} from '@mui/material'

const WelcomeDisplay = () => {
    const displays = [{
        getIcon: () => <AccountBalanceIcon />,
        title: 'Safely Connect to Thousands of Financial Institutions',
        description: 'Consolidate all your bank information in a single app!'
    },
    {
        getIcon: () => <CategoryIcon />,
        title: 'Automatically Categorize Your Transactions',
        description: 'Effortlessly keep track of your spendings and income!'
    },
    {
        getIcon: () => <AssessmentIcon />,
        title: 'View Detailed Reports on Your Financial Position',
        description: 'Understand your financial position has never been easier!'
    }
    ]
    const changeWelcomeText = (forward) => {
        if (forward) {
            if (curDisplay !== 2) {
                setCurDisplay(curDisplay => curDisplay += 1)
            } else {
                setCurDisplay(0)
            }
        } else {
            if (curDisplay !== 0) {
                setCurDisplay(curDisplay => curDisplay -= 1)
            } else {
                setCurDisplay(2)
            }
        }
    }
    const [curDisplay, setCurDisplay] = useState(0)
    return <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={2}>
            <Button onClick={() => changeWelcomeText(false)}><ArrowBackIosIcon /></Button>
        </Grid>
        <Grid item xs={8}>
            <Stack spacing='5px'>
                <Avatar sx={{ m: 'auto', height: '80px', width: '80px' }}>
                    {curDisplay ? displays[curDisplay].getIcon() : <AccountBalanceIcon />}
                </Avatar>
                <Typography
                    component="h2"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >{displays[curDisplay].title}</Typography>
                <Typography
                    variant="h7"
                    align="center"
                    color="text.secondary"
                    paragraph
                >{displays[curDisplay].description}</Typography>
            </Stack>
        </Grid>
        <Grid item xs={2}>
            <Button onClick={() => changeWelcomeText(true)}><ArrowForwardIosIcon /></Button>
        </Grid>
    </Grid>
}

export default WelcomeDisplay