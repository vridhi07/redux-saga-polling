import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";

import {AddNewOptionSuccess, AddNewOptionError, PollListRequest} from "../Redux/action/actions";

export function* AddNewOptionSaga(action){

    try{
        let id = action.payload.id;
        let option = action.payload.option;

        const url = `/add_new_option?id=${id}&option_text=${option}`
        const response = yield call(
            axiosCall,
            "POST",
            url,
        );

        // console.log(response,   "response from the API");

        let data = response.data;

        // console.log(data,   "dataaaaaa");

        if (data.error == 0) {
            yield put(AddNewOptionSuccess(data));
            yield put(PollListRequest());
          } else {
            yield put(AddNewOptionError(data.error));
          }

    }catch(error){
        yield put(AddNewOptionError("Unexpected error occured"));
    }
}
