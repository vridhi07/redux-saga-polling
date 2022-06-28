import { all,takeLatest } from "redux-saga/effects";
import * as actions from '../Redux/action/actions';
import {signUpSaga} from "./signupsaga";
import { loginSaga } from "./loginsaga";
import { pollListSaga } from "./pollListsaga";
import {DeletePollSaga} from "./deletepollsaga";
import {CreateNewPollSaga} from "./addpollsaga";
import {UpdateTitleSaga} from "./updatepolltitlesaga";
import { AddNewOptionSaga } from "./addnewoptionsaga";
import { DeleteOptionSaga } from "./deleteoptionsaga";
import {PollSaga} from "./pollsaga";

function* watchAllSaga(){
    yield takeLatest (actions.SignUpRequest,signUpSaga)
    yield takeLatest (actions.LoginRequest,loginSaga)
    yield takeLatest(actions.PollListRequest,pollListSaga)
    yield takeLatest(actions.DeletePollRequest,DeletePollSaga)
    yield takeLatest(actions.Create_NewPollRequest,CreateNewPollSaga)
    yield takeLatest(actions.UpdatePollTitleRequest, UpdateTitleSaga)
    yield takeLatest(actions.AddNewOptionRequest, AddNewOptionSaga)
    yield takeLatest(actions.DeleteOptionRequest, DeleteOptionSaga)
    yield takeLatest(actions.PollRequest, PollSaga)
}

export default function* rootSaga(){
    yield all ([watchAllSaga()]);
}