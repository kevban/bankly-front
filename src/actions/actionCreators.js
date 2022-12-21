import axios from 'axios'
import BanklyApi from '../BanklyAPI';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function getTokenAction() {
    return async function (dispatch) {
        try {
            const data = await BanklyApi.createLinkToken()
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
            const data = await BanklyApi.getTransactions()
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
            const data = await BanklyApi.setAccessToken(publicToken)
            dispatch({
                type: 'SET_ACCESS_TOKEN',
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