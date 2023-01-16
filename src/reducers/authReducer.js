const INITIAL_STATE = {}

function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.data }
        case "LOGOUT":
            return { ...state, user: { loggedIn: false } }
        case "SET_USER_NULL":
            return { ...state, user: null }
        case "UPDATE_TRANSACTION":
            return { ...state, user: { ...state.user, transactions: action.data } }
        case "ADD_CATEGORY":
            return { ...state, user: { ...state.user, user: { ...state.user.user, categories: [...state.user.user.categories, action.data] } } }
        case "REMOVE_CATEGORY":
            return { ...state, user: { ...state.user, user: { ...state.user.user, categories: state.user.user.categories.filter(val => val.id !== action.data) } } }
        case "ADD_TAG":
            return { ...state, user: { ...state.user, user: { ...state.user.user, tags: [...state.user.user.tags, action.data] } } }
        case "REMOVE_TAG":
            return { ...state, user: { ...state.user, user: { ...state.user.user, tags: state.user.user.tags.filter(val => val !== action.data) } } }
        case "ADD_TRANSACTION":
            return { ...state, user: { ...state.user, transactions: state.user.transactions? [...state.user.transactions, action.data]: [action.data] } }
        case "DELETE_TRANSACTION":
            return { ...state, user: { ...state.user, transactions: state.user.transactions.filter(val => val.transaction_id !== action.data) } }
        case "EDIT_TRANSACTION":
            return {
                ...state, user: {
                    ...state.user, transactions: state.user.transactions.map(val => {
                        if (val.transaction_id !== action.data.transaction_id) {
                            return val
                        } else {
                            return action.data
                        }
                    })
                }
            }
        case "ADD_RULE":
            return {
                ...state, user: {
                    ...state.user,
                    user: { ...state.user.user, rules: [...state.user.user.rules, action.data] }
                },
                transactions: state.user.transactions.map(transaction => {
                    if (transaction.name.toLowerCase().includes(action.data.contains)) {
                        transaction.bankly_category = action.data.bankly_category
                    }
                    return transaction
                }) }
        case "DELETE_RULE":
            return { ...state, user: { ...state.user, user: { ...state.user.user, rules: state.user.user.rules.filter(val => val.contains !== action.data) } } }
        default:
            return state
    }
}



export default authReducer


