import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";
import { DeletePollSuccess, DeletePollError, PollListRequest} from "../Redux/action/actions";

export function* DeletePollSaga(action){
    
    let id = action.payload.id;
// console.log(id);
    const url = `/delete_poll?id=${id}`

    const response = yield call(
        axiosCall,
        "GET",
        url,
    );

    // console.log(response,   "resp frm delete API");

    const data = response.data;
    if(data.error == 0){
        yield put(DeletePollSuccess(data));
        yield put(PollListRequest());
    } else {
        yield put(DeletePollError(data.error));
      }

}