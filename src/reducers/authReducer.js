const INITIAL_STATE = {}

function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "LOGIN":
            console.log("login:", action.data)
            return { ...state, user: action.data }
        case "LOGOUT":
            console.log("logged out")
            return { ...state, user: { loggedIn: false } }
        case "SET_USER_NULL":
            return { ...state, user: null }
        case "UPDATE_TRANSACTION":
            console.log(action.data)
            return { ...state, user: { ...state.user, transactions: action.data } }
        case "ADD_CATEGORY":
            return { ...state, user: { ...state.user, user: { ...state.user.user, categories: [...state.user.user.categories, action.data] } } }
        default:
            return state
    }
}

export default authReducer


