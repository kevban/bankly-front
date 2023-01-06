import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Welcome from './Welcome'
import WelcomeDisplay from "./WelcomeDisplay";

const Landing = () => {
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            if (user.token) {
                navigate('/')
            }
        }
    }, [user])
    if (!user) {
        return <LoadingPage />
    }
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