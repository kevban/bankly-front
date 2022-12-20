import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from "react-router-dom";
import Welcome from './Welcome'
import WelcomeDisplay from "./WelcomeDisplay";

const Landing = () => {
    return <Container maxWidth='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Grid container sx={{ mv: '50%' }}>
            <Grid item xs={7}>
                <Welcome></Welcome>
            </Grid>
            <Grid item xs={5}>
                <WelcomeDisplay></WelcomeDisplay>
            </Grid>
        </Grid>
    </Container>
}
export default Landing