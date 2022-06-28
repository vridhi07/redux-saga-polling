import * as actions from "../constants";

const initialState = {
    isLoading: false,
};

const DeletePollreducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.DELETE_POLL_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case actions.DELETE_POLL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.payload,
            };

        case actions.DELETE_POLL_REQUEST:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default DeletePollreducer;