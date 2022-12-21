import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

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