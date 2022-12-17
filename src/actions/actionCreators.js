import axios from 'axios'
import PiggyApi from '../PiggyAPI';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function getTokenAction() {
    return async function (dispatch) {
        try {
            const data = await PiggyApi.createLinkToken()
            dispatch({
                type: 'SET_TOKEN',
                data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

function getTransaction() {
    return async function (dispatch) {
        try {
            const data = await PiggyApi.getTransactions()
            dispatch({
                type: 'GET_TRANSACTION',
                data
            })
        } catch (e) {
            console.log(e)
        }
    }
}


function exchangePublicTokenToAccess(publicToken) {
    return async function (dispatch) {
        try {
            const data = await PiggyApi.setAccessToken(publicToken)
            dispatch({
                type: 'SET_ACCESS_TOKEN',
                data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export { getTokenAction, exchangePublicTokenToAccess, getTransaction }