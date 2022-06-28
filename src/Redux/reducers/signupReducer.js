import * as actions from "../constants";

const initialState = {
    isLoading: false,
    isSignedUp: false,
};

const SignUpReducer = (state = initialState, action) => {
    // console.log(action.payload,"LLLLLLLLLLLLLLLLLL")
    switch (action.type) {
        case actions.SIGN_UP_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case actions.SIGN_UP_SUCCESS:
            return {
                ...state,
                isSignedUp: true,
                isLoading: false,
                response: action.payload,
            };

        case actions.SIGN_UP_ERROR:
            return {
                ...state,
                isSignedUp: false,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default SignUpReducer;