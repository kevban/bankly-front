import axios from 'axios'
import BanklyApi from '../BanklyAPI';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function getTokenAction() {
    return async function (dispatch) {
        try {
            const data = await BanklyApi.createLinkToken()
            dispatch({
                type: 'SET_PUBLIC_TOKEN',
                data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

// get transaction from Plaid
function getTransaction() {
    return async function (dispatch) {
        try {
            const data = await BanklyApi.getTransactions()
            dispatch({
                type: 'GET_TRANSACTION',
                data
            })
        } catch (e) {
            dispatch({
                type: 'GET_TRANSACTION',
                data: 'error'
            })
        }
        
    }
}

// this is when the user successfully connect to a bank
function exchangePublicTokenToAccess(publicToken) {
    return async function (dispatch) {
        try {
            await BanklyApi.setAccessToken(publicToken)
            const data = await BanklyApi.getInstitutions()
            dispatch({
                type: 'SET_CONNECTED_BANKS',
                data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

function login(loginData) {
    return async function (dispatch) {
        const data = await BanklyApi.login(loginData)
        dispatch({
            type: 'LOGIN',
            data
        })
    }
}

function register(signupData) {
    return async function (dispatch) {
        const data = await BanklyApi.register(signupData)
        dispatch({
            type: 'REGISTER',
            data
        })
    }
}

export { getTokenAction, exchangePublicTokenToAccess, getTransaction, login, register }