import { Grid, IconButton } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Title from './Title'
import { formatNum } from '../../helpers/formatNum'
import moment from 'moment'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title as ChartTitle,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTitle,
    PointElement,
    LineElement,
);



const Graph = () => {
    const user = useSelector(store => store.auth.user)
    const [chartToDisplay, setCharToDisplay] = useState(true)
    const [lineChart, setLineChart] = useState({})
    const [barChart, setBarChart] = useState({})
    const totalByCategory = useCallback((transactions, month) => {
        let totals = {};
        let categories = [];
        let amounts = [];
        let colors = [];
        for (let i = 0; i < transactions.length; i++) {
            let date = moment(transactions[i].date, 'YYYY-MM-DD');
            if (date.month() === month && transactions[i].amount > 0 && transactions[i].bankly_category.name !== 'Untracked') {
                let category = transactions[i].bankly_category.name;
                let color = transactions[i].bankly_category.color;
                if (totals[category] == null) {
                    totals[category] = 0;
                    categories.push(category);
                    amounts.push(0);
                    colors.push(color);
                }
                let index = categories.indexOf(category);
                amounts[index] += formatNum(transactions[i].amount);
            }
        }
        return [categories, amounts, colors];
    }, [])

    const totalByDay = useCallback((transactions, month) => {
        let days = [];
        let expenses = [];
        let income = [];
        for (let i = 1; i <= moment().month(month).daysInMonth(); i++) {
            days.push(i);
            expenses.push(0);
            income.push(0);
        }
        for (let i = 0; i < transactions.length; i++) {
            let date = moment(transactions[i].date, 'YYYY-MM-DD');
            if (date.month() === month && transactions[i].bankly_category.name !== 'Untracked') {
                let day = date.date();
                let index = days.indexOf(day);
                if (transactions[i].amount > 0) {
                    expenses[index] += formatNum(transactions[i].amount);
                } else {
                    income[index] += formatNum(-transactions[i].amount);
                }
            }
        }
        return [days, expenses, income];
    }, [])


    useEffect(() => {
        if (user) {
            if (user.transactions) {
                const curMonth = moment().month()
                const [categories, amounts, colors] = totalByCategory(user.transactions, curMonth)
                let barOptions = {
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    elements: {
                        bar: {
                            borderWidth: 2,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
                let barData = {
                    labels: categories,
                    datasets: [
                        {
                            label: '$ amount',
                            data: amounts,
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1,
                        },
                    ],
                }
                setBarChart({ options: barOptions, data: barData })
                const [days, expenses, income] = totalByDay(user.transactions, curMonth)
                let lineOptions = {
                    responsive: true,
                    maintainAspectRatio: false
                }
                let lineData = {
                    labels: days,
                    datasets: [
                        {
                            label: 'Income',
                            data: income,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Expenses',
                            data: expenses,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                }
                setLineChart({ options: lineOptions, data: lineData })
            }
        }
    }, [user, totalByCategory, totalByDay])
    if (!user || !lineChart.options) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <>
            <Title>This Month</Title>
            <Grid container alignItems={'center'} sx={{ my: 'auto' }}>
                <Grid item xs={2}><IconButton onClick={() => setCharToDisplay((curChart => !curChart))}><ArrowLeftIcon></ArrowLeftIcon></IconButton></Grid>
                <Grid item xs={8}>
                    <div style={{ height: "240px" }}>
                        {chartToDisplay ?
                            <Bar
                                data={barChart.data}
                                options={barChart.options}
                                style={{ height: '240px' }}
                            ></Bar> :
                            <Line
                                data={lineChart.data}
                                options={lineChart.options}
                                style={{ height: '240px' }}
                            ></Line>}
                    </div>

                </Grid>
                <Grid item xs={2}><IconButton onClick={() => setCharToDisplay((curChart => !curChart))}><ArrowRightIcon></ArrowRightIcon></IconButton></Grid>
            </Grid>
        </>

    )

}

export default Graph