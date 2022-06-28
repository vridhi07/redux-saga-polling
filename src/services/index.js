import axios from 'axios';
// import {BaseUrl} from "../config";

const axiosCall=(method,url ,data,headers)=>{
  console.log(process.env.REACT_APP_API_URL,'hello');
    let URL=`${process.env.REACT_APP_API_URL}${url}`
        if(method==="GET"){
          return axios.get(URL,data,headers)
        }
        if(method==="POST"){
          return  axios.post(URL,data,headers)
        }
        if(method==="PUT"){
          return  axios.put(URL,data,headers)
        }
        if(method==="DELETE"){
          return  axios.delete(URL,headers)
        }
}

export default axiosCall;