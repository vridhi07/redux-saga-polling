import * as actions from "../constants"

let initialState = {
    isLoading: false,
};

const AddNewOptionreducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADDNEW_OPTIONREQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.ADDNEW_OPTIONSUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.payload.response,
            };
        case actions.ADDNEW_OPTIONERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
export default AddNewOptionreducer;