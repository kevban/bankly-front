const INITIAL_STATE = {banks: {institutions: []}}

function plaidReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_PUBLIC_TOKEN":
            console.log('setting public token:', action.data)
            return {...state, linkToken: action.data}
        case "SET_CONNECTED_BANKS":
            console.log('setting bank:', action.data)
            return {...state, banks: action.data}
        case "GET_TRANSACTION":
            console.log("transactions:", action.data)
            return {...state, transactions: action.data}
        default:
            return state
    }
}

export default plaidReducer