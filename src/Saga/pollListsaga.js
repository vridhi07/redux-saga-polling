import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";
import { PollListSuccess, PollListError} from "../Redux/action/actions";

export function* pollListSaga(action){
    try{
        const url = `/list_polls`

        const response = yield call(
            axiosCall,
            "GET",
            url,
        );
        // console.log(response,   "response from the API");

        if (response) {
            yield put (PollListSuccess(response.data.data))
        } else {
            yield put (PollListError(response.error))
        }
    } catch(error){
        yield put(PollListError(error));
    }
}