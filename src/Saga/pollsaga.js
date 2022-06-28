import { put, call } from "redux-saga/effects";
import axiosCall from "../services/index";
import axios from 'axios';

import { PollListRequest, PollSuccess, PollError } from "../Redux/action/actions";


export function* PollSaga(action) {
    try {

        const id = action.payload.id;
        const text = action.payload.option;
        const token = action.payload.token;

        let header = {
            "Content-Type": "application/json",
            access_token: token,
        }

        // const url = `/do_vote?id=${id}&option_text=${text}`,

        // const response = yield call(
        //     axiosCall,
        //     "POST",
        //     url,
        //     header
        // );

        let response = yield call(
            axios.get,
            `https://secure-refuge-14993.herokuapp.com/do_vote?id=${id}&option_text=${text}`,
            { headers: header }
        );

        console.log(response, "response from the API");

        let data = response.data;

        console.log(data, "dataaaaaaaa")

        if (data.error === 0) {
            yield put(PollSuccess(data.data))
            yield put(PollListRequest());
        } else {
            yield put(PollError(data.error))
        }
    } catch (error) {
        yield put(PollError("Unexpected error occured"));
    }
}