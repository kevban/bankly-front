import { Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Title from './Title'
import moment from 'moment'
import { formatNum } from '../../helpers/formatNum'


const Summary = () => {
    const user = useSelector(store => store.auth.user)
    const [statToDisplay, setStat] = useState(0)
    const changeStat = (right) => {
        if (right) {
            if (statToDisplay >= 5) {
                setStat(0)
            } else {
                setStat((statToDisplay) => statToDisplay + 1)
            }
        } else {
            if (statToDisplay <= 0) {
                setStat(5)
            } else {
                setStat((statToDisplay) => statToDisplay - 1)
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


    useEffect(() => {
        if (user) {
            const curYear = moment().year()
            const curMonth = moment().month()
            const stats = [
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
            ]
            for (let transaction of user.transactions) {
                let dateParts = transaction.date.split('-')
                let amount = formatNum(transaction.amount)
                if (transaction.bankly_category.name != 'Untracked') {
                    if (dateParts[0] == curYear) {
                        if (transaction.amount > 0) {
                            stats[1].amount += amount
                        } else {
                            stats[4].amount -= amount
                        }
                    }
                    if (dateParts[1] == curMonth + 1) {
                        if (transaction.amount > 0) {
                            stats[0].amount += amount
                        } else {
                            stats[3].amount -= amount
                        }
                    }
                    if (transaction.amount > 0) {
                        stats[2].amount += amount
                    } else {
                        stats[5].amount -= amount
                    }
                }
            }
            setStats(stats)
        }
    }, [user])

    if (!user) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <>
            <Title>Summary</Title>
            <Grid container alignItems={'center'} sx={{ my: 'auto' }}>
                <Grid item xs={2}><IconButton onClick={() => changeStat(false)}><ArrowLeftIcon></ArrowLeftIcon></IconButton></Grid>
                <Grid item xs={8}>
                    <h3>{stats[statToDisplay].type}</h3>
                    <h2>{formatNum(stats[statToDisplay].amount, true)}{}</h2>
                    <p>{stats[statToDisplay].period}</p>
                </Grid>
                <Grid item xs={2}><IconButton onClick={() => changeStat(true)}><ArrowRightIcon></ArrowRightIcon></IconButton></Grid>
            </Grid>
        </>

    )

}

export default Summary