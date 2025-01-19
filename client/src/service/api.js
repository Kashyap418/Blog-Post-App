import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';


const API_URL = '';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        // reverse or what ?
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        //Stop global loader here
        return processResponse(response);
    },
    function (error) {
        //Stop global loader here
        return Promise.reject(processError(error));
    }
)

const processResponse = (response) => {
    if (response?.status == 200) {
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        }
    }
}

const processError = (error) => {
    if (error.response) {
        //request was made succesfully but server responsed with status other than range of 2.x.x
        console.log('ERROR IN RESPONSE:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) {
        //request made but no reponse recieved
        //backend and frontend not connecetd properly
        console.log('ERROR IN REQUEST:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        //problem in frontend setup
        console.log('ERROR IN NETWORK:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body, //in delete api we do not send body why?
            // data: body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            },
            // headers: {
            //     "Accept": "application/json, multipart/form-data", 
            //     "Content-Type": "application/json"
            // }
        });
}

export { API };