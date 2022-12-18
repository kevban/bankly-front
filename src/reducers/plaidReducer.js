const INITIAL_STATE = {}

function plaidReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_TOKEN":
            console.log('setting public token:', action.data)
            return {...state, linkToken: action.data}
        case "SET_ACCESS_TOKEN":
            console.log('setting access token:', action.data)
            return {...state, accessToken: action.data.access_token, userId: action.data.userId}
        case "GET_TRANSACTION":
            console.log("transactions:", action.data)
            return {...state, transactions: action.data}
        case "LOGIN":
            console.log("login:", action.data)
            return {...state, user: action.data}
        case "REGISTER":
            console.log("signup:", action.data)
            return {...state, user: action.data}
        default:
            return state
    }
}

export default plaidReducer