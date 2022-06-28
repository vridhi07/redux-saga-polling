import * as actions from '../constants';

const initialState = {
    isLoading: false,
};

const PollReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.POLL_REQUEST:
            return{
                ...state,
                isLoading:true,
            };
        case actions.POLL_SUCCESS:
            return{
                ...state,
                isLoading:false,
                response: action.payload,
            };
        case actions.POLL_ERROR:
            return{
                ...state,
                isLoading:false,
                response:action.payload,
            };
        default:
            return state;
    }
};

export default PollReducer;