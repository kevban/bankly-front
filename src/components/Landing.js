import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Landing = () => {
    return <Container>
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >Welcome to Bank.ly</Typography>
        <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >Your one-stop-shop to all your personal finance needs!</Typography>
        <Button variant='contained'>SIGN UP</Button>
        <Button variant='outlined'>LOG IN</Button>
    </Container>
}
export default Landing