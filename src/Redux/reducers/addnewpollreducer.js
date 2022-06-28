import * as actions from "../constants";

const initialstate = {
    isLoading: false,
  };

  const CreateNewPollreducer = (state = initialstate, action) => {
    switch (action.type) {
      case actions.CREATE_NEWPOLL_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case actions.CREATE_NEWPOLL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          response: action.payload,
        };
  
      case actions.CREATE_NEWPOLL_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default CreateNewPollreducer;