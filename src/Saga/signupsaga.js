import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";
import { SignUpSuccess, SignUpError } from "../Redux/action/actions";

export function* signUpSaga(action) {
    try {
        const username = action.payload.username;
        const password = action.payload.password;
        const option = action.payload.option;

        const  url = `/add_user?username=${username}&password=${password}&role=${option}`

        const response = yield call(
            axiosCall,
            "POST",
            url,
        );
        const {data}=response
        // console.log(data, "api data");

        if(data.error==0){
            // console.log(data.data, "xyzzzzzz")
            yield put(SignUpSuccess(data.data))
        }
        if(data.error==1){
            // console.log(data.message, "abcccccccccc")
            yield put(SignUpError(data.message))
        }
    } catch (error) {
        // console.log("Unexpected error occured");
        yield put(SignUpError("Unexpected error occured"))
    }
}

