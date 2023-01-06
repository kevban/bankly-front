const INITIAL_STATE = {banks: {institutions: []}}

function plaidReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_PUBLIC_TOKEN":
            console.log('setting public token:', action.data)
            return {...state, linkToken: action.data}
        default:
            return state
    }
}

export default plaidReducer