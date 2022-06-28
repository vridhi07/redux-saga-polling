import * as actions from "../constants";

const initialState = {
    isPollfetched: false,
    isError: false,
    isLoading: false,
    poll: [],
};

const PollListReducer = (state = initialState, action) => {
    // console.log(action.payload,  "action.payloaaaaaad")
    switch (action.type) {
        case actions.POLL_LIST_REQUEST:
            return{
                ...state,
                isLoading: true,
            };
            case actions.POLL_LIST_SUCCESS:
                return{
                    ...state,
                    isLoading: false,
                    isPollfetched: true,
                    poll: action.payload,
                };
                case actions.POLL_LIST_ERROR:
                    return{
                        ...state,
                        isPollfetched: false,
                        isError: true,
                        isLoading: false,
                        error: action.payload,
                    }
        default:
            return state;
    }
};

export default PollListReducer;