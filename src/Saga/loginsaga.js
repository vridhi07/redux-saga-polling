import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";
import { LoginSuccess, LoginError } from "../Redux/action/actions";
import jwt from "jsonwebtoken";

export function* loginSaga(action) {
    try {
        const username = action.payload.username;
        console.log(username)
        const password = action.payload.password;
        console.log(password)
        const url = `/login?username=${username}&password=${password}`

        const response = yield call(
            axiosCall,
            "POST",
            url,
        );
         console.log(response,   "response from the API");
        const { data } = response
        // console.log(data, "api data");

    

        if (data.error == 0) {
            let user = jwt.verify(data.token, "jwt_tok");
            yield put(LoginSuccess(user.role))
            localStorage.setItem("token", data.token)
            localStorage.setItem("userType", user.role);
            
            // console.log(data.token,   "data tokennnnnnn")
            // console.log(user.role,   "user roleeeeeeeee");
        }
        if (data.error == 1) {
            // console.log(data.message, "abcccccccccc")
            yield put(LoginError(data.data))
        }
    } catch (error) {
        // console.log("Unexpected error occured");
        yield put(LoginError("Unexpected error occured"))
    }
}