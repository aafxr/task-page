import axios, {AxiosInstance} from "axios";
import {bxAuth} from "../bitrix";

interface AxiosInstanceWithFlag extends AxiosInstance {
    refresh: boolean
}


export const appFetch = axios.create({}) as AxiosInstanceWithFlag;

//automatically refresh auth
appFetch.interceptors.response.use(r => r, async (err) => {
    const originalRequest = err.config
    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            if (await bxAuth.refresh()) return appFetch(originalRequest)
        } catch (e) {
            return Promise.reject(e)
        }
    }
    return Promise.reject(err)
})

axios.get('')