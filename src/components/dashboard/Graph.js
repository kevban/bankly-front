import { Grid, IconButton } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useInsertionEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Title from './Title'
import moment from 'moment'
import { SettingsInputAntennaTwoTone } from '@mui/icons-material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const Graph = () => {
    const user = useSelector(store => store.auth.user)
    const [chartToDisplay, setChart] = useState(0)
    const [chartData, setChartData] = useState()
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    useEffect(() => {

    }, [])

    const changeChart = (right) => {
        if (right) {
            if (chartToDisplay >= 5) {
                setChart(0)
            } else {
                setChart((chartToDisplay) => chartToDisplay + 1)
            }
        } else {
            if (chartToDisplay <= 0) {
                setChart(5)
            } else {
                setChart((chartToDisplay) => chartToDisplay - 1)
            }
        }
    }
    const [stats, setStats] = useState([
        {
            type: 'Expenses',
            amount: 0,
            period: `For the month of ${moment().format('MMMM')}`
        },
        {
            type: 'Expenses',
            amount: 0,
            period: `${moment().format('YYYY')} Year to date`
        },
        {
            type: 'Expenses',
            amount: 0,
            period: `Since inception`
        },
        {
            type: 'Income',
            amount: 0,
            period: `For the month of ${moment().format('MMMM')}`
        },
        {
            type: 'Income',
            amount: 0,
            period: `${moment().format('YYYY')} Year to date`
        },
        {
            type: 'Income',
            amount: 0,
            period: `Since inception`
        }
    ])

    if (!user) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <>
            <Title>This Month</Title>
            <Grid container alignItems={'center'} sx={{ my: 'auto' }}>
                <Grid item xs={2}><IconButton onClick={() => changeChart(false)}><ArrowLeftIcon></ArrowLeftIcon></IconButton></Grid>
                <Grid item xs={8}>
                    <Doughnut data={data}></Doughnut>
                </Grid>
                <Grid item xs={2}><IconButton onClick={() => changeChart(true)}><ArrowRightIcon></ArrowRightIcon></IconButton></Grid>
            </Grid>
        </>

    )

}

export default Graph