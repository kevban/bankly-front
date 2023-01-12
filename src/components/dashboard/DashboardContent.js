import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from './Chart';
import Orders from './TransactionsList';
import TransactionsList from './TransactionsList';
import Summary from './Summary';
import Graph from './Graph';



function DashboardContent() {

    return (
        <Grid container spacing={3} sx={{ p: '30px' }}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240
                    }}
                >
                    {/* <Graph></Graph> */}
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Summary></Summary>
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <TransactionsList maxPageLength={6} />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardContent