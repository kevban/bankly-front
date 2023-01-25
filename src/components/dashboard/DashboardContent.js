import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from './Chart';
import TransactionsList from './TransactionsList';
import Summary from './Summary';
import Graph from './Graph';
import { useMediaQuery } from '@mui/material';



function DashboardContent() {
    const smScreen = useMediaQuery(
        '(max-width:800px)'
    )
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 280
                    }}
                >
                    <Graph></Graph>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 280,
                    }}
                >
                    <Summary></Summary>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: smScreen? 0 : 2, display: 'flex', flexDirection: 'column' }}>
                    <TransactionsList maxPageLength={6} />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardContent