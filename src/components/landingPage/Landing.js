import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
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
    }, [user, navigate])
    if (!user) {
        return <LoadingPage />
    }
    return <Container maxWidth='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 'auto' }}>
        <Grid container sx={{ mv: '50%' }}>
            <Grid item xs={12} md={7} sx={{my: 10}}>
                <Welcome></Welcome>
            </Grid>
            <Grid item xs={12} md={5} sx={{my: 10}}>
                <WelcomeDisplay></WelcomeDisplay>
            </Grid>
        </Grid>
    </Container>
}
export default Landing