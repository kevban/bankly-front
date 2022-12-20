const INITIAL_STATE = {}

function authReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
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

export default authReducer


