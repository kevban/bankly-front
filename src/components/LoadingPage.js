import { CircularProgress, Stack } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const LoadingPage = () => {
    return (
        <Container maxWidth='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Bank.ly</h1>
                <CircularProgress />
            </Stack>

        </Container>
    )
}

export default LoadingPage