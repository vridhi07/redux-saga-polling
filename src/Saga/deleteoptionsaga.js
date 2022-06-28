import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";

import { DeleteOptionSuccess, DeleteOptionError, PollListRequest} from "../Redux/action/actions";

export function* DeleteOptionSaga(action){

    try{
        let id = action.payload.id;
        let text = action.payload.text;

        const url = `/delete_poll_option?id=${id}&option_text=${text}`
        const response = yield call(
            axiosCall,
            "POST",
            url,
        );

        // console.log(response,   "response from the API");

        let data = response.data;

        // console.log(data,   "dataaaaaa");

        if (data.error == 0) {
            yield put(DeleteOptionSuccess(data));
            yield put(PollListRequest());
          } else {
            yield put(DeleteOptionError(data.error));
          }

    }catch(error){
        yield put(DeleteOptionError("Unexpected error occured"));
    }
}