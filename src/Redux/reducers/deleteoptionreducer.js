import * as actions from "../constants"

let initialState = {
    isLoading: false,
  };

  const DeleteOptionreducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.DELETE_OPTION_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case actions.DELETE_OPTION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case actions.DELETE_OPTION_ERROR:
        return {
          ...state,
          isLoading: false,
          response: action.payload,
        };
      default:
        return state;
    }
  };
  export default DeleteOptionreducer;