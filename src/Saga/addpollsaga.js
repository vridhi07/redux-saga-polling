import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";

import { Create_NewPollSuccess, Create_NewPollError} from "../Redux/action/actions";

export function* CreateNewPollSaga(action){
    try{

        let option = action.payload.options;
        let title = action.payload.title;
        let length = option.length;
        let optionString = "";
        option.map((opt, index)=>{
            if (index===length-1) {
                optionString += opt;
            } else{
                optionString += opt + "____";
            }
        })
        const url = `/add_poll?title=${title}&options=${optionString}`
        const response = yield call(
            axiosCall,
            "POST",
            url,
        );
        // console.log(response,   "response from the API");

        let data = response.data;

        if (data.error === 0) {
            yield put (Create_NewPollSuccess(data.data))
        } else {
            yield put (Create_NewPollError(data.error))
        }
    } catch(error){
        yield put(Create_NewPollError("Unexpected error occured"));
    }
}