const INITIAL_STATE = {banks: {institutions: []}}

function plaidReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_PUBLIC_TOKEN":
            return {...state, linkToken: action.data}
        default:
            return state
    }
}

export default plaidReducer