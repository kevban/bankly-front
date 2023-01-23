const INITIAL_STATE = {banks: {institutions: []}}

function plaidReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_PUBLIC_TOKEN":
            return {...state, linkToken: action.data}
        case "UPDATE_LINK":
            return {...state, updateLink: action.data}
        case "CLEAR_LINK":
            return {...state, updateLink: null}
        default:
            return state
    }
}

export default plaidReducer