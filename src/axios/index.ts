import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {errors} from "../errors";
import {fetchHasPermit} from "../api";


interface AxiosInstanceWithFlag extends AxiosInstance {
    refresh: boolean
}

interface RequestConfigWithFlag extends AxiosRequestConfig{
    _retry?: boolean
}


const AUTH = 'auth='

export const appFetch = axios.create({
    timeout: 10000
}) as AxiosInstanceWithFlag;

//@ts-ignore
window.axios = appFetch

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))


let refresh = false
let refreshResult = false

appFetch.interceptors.request.use(r => {
    if(r.params) r.params['initData'] = Telegram.WebApp.initData
    else r.params = {initData: Telegram.WebApp.initData}
    return r
})

appFetch.interceptors.response.use(async (r) => r, async (err) => {
    const originalRequest = err.config as RequestConfigWithFlag
    if (err.response?.status === 401 ) {
        if(originalRequest._retry) throw new Error(errors.UNAUTHORIZED)
        originalRequest._retry = true
        try {
            while(refresh) await sleep(50)
            if(refreshResult) return appFetch(originalRequest)
            if (await refreshSession()) {
                return appFetch(originalRequest)
            }
            return Promise.reject(new Error(errors.UNAUTHORIZED))
        } catch (e) {
            return Promise.reject(new Error(errors.UNAUTHORIZED))
        }
    }
    return Promise.reject(err)
})



async function refreshSession(): Promise<boolean>{
    refresh = true
    try{
        const res = await fetchHasPermit()
        refreshResult = res.ok
        return res.ok
    } finally {
        refresh = false
    }
}

