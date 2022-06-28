import * as actions from "../constants";


const initialState = {
    isLoading: false,
  };
  
  const UpdateTitlereducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.UPDATE_POLLTITLE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case actions.UPDATE_POLLTITLE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          response: action.payload,
        };
  
      case actions.UPDATE_POLLTITLE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UpdateTitlereducer;