import axios from 'axios'
import BanklyApi from '../BanklyAPI';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

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

// this action retrieve user info and store it in redux
function storeUser(token = localStorage.getItem('token')) {
    if (!token) {
        console.log('No user token!')
        return async function (dispatch) {
            dispatch({
                type: 'LOGIN',
                data: {
                    notLoggedIn: true
                }
            })
        }
    } else {
        return async function (dispatch) {
            const banks = await BanklyApi.getInstitutions()
            const transactions = await BanklyApi.getTransactions()
            const user = await BanklyApi.getUser()
            dispatch({
                type: 'LOGIN',
                data: {
                    token: token,
                    user: user,
                    banks: banks.institutions,
                    transactions: transactions,
                    lastUpdated: moment().format('YYYY-MM-DD HH:mm')
                }
            })
        }
    }

}


// this action retrives transaction from plaid
function updateTransactions() {
    return async function (dispatch) {
        const res = await BanklyApi.updateTransactions()
        const data = await BanklyApi.getTransactions()
        dispatch({
            type: 'UPDATE_TRANSACTION',
            data
        })
    }
}

// this action set user to null, which displays the loading page.
// used when user log in or register.
function removeUser() {
    return function (dispatch) {
        try {
            dispatch({
                type: 'SET_USER_NULL'
            })
        } catch (e) {
            console.log(e)
        }
    }
}

// this action adds a category to the user's profile
function addCategory(category) {
    return  async function(dispatch) {
        try {
            console.log('category', category)
            const res = await BanklyApi.addCategory(category)
            dispatch({
                type: 'ADD_CATEGORY',
                data: {...category}
            })
        } catch (e) {
            console.log(e)
        }
    }
}

function logOut() {
    return async function (dispatch) {
        BanklyApi.logOut()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

// retrieves the payload from jwt sent from server. Does not verify it.
// Also saves the token to localStorage
function decodeUserJWT(token) {
    let payload = jwtDecode(token)
    localStorage.setItem('token', token)
    console.log('decoded token', payload)
    return payload
}

export { getTokenAction, storeUser, logOut, removeUser, addCategory, updateTransactions }