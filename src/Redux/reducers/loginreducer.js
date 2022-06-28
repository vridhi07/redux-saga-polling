import * as actions from "../constants"

const initialState = {
    isLoading: false,
    isLoggedIn: false,
};

const LoginReducer = (state = initialState, action) => {
    // console.log(action.payload,"LLLLLLLLLLLLLLLLLL")
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
                response: action.payload,
            };

        case actions.LOGIN_ERROR:
            return {
                isLoggedIn: false,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default LoginReducer;