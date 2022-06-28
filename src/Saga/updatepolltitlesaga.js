import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";

import { UpdatePollTitleSuccess, UpdatePollTitleError, PollListRequest} from "../Redux/action/actions";

export function* UpdateTitleSaga(action){

    try{
        let title = action.payload.Title;
        let id = action.payload.id;

        const url = `/update_poll_title?id=${id}&title=${title}`
        const response = yield call(
            axiosCall,
            "POST",
            url,
        );

        // console.log(response,   "response from the API");

        let data = response.data;

        // console.log(data,   "dataaaaaa");

        if (data.error == 0) {
            yield put(UpdatePollTitleSuccess(data));
            yield put(PollListRequest());
          } else {
            yield put(UpdatePollTitleError(data));
          }

    }catch(error){
        yield put(UpdatePollTitleError("Unexpected error occured"));
    }
}
