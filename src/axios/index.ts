import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {bxAuth} from "../bitrix";
import {errors} from "../errors";
import {BASE_URL} from "../App";

interface AxiosInstanceWithFlag extends AxiosInstance {
    refresh: boolean
}

interface RequestConfigWithFlag extends AxiosRequestConfig{
    _retry?: boolean
}


const AUTH = 'auth='

export const appFetch = axios.create({}) as AxiosInstanceWithFlag;

//automatically refresh auth
appFetch.interceptors.response.use(r => r, async (err) => {
    const originalRequest = err.config as RequestConfigWithFlag
    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            if (await refreshSession(Telegram.WebApp.initData)) {
                const idx = originalRequest.url?.indexOf(AUTH)
                if(idx && idx !== -1) originalRequest.url = originalRequest.url!.slice(0, idx + AUTH.length) + bxAuth.oauthData?.access_token
                return appFetch(originalRequest)
            }
            return Promise.reject(new Error(errors.UNAUTHORIZED))
        } catch (e) {
            return Promise.reject(new Error(errors.UNAUTHORIZED))
        }
    }
    return Promise.reject(err)
})


async function refreshSession(authData: string): Promise<boolean>{
    const authorized = await axios.get(BASE_URL + 'api/auth/isAuthorized/')
    if(authorized.data.ok){
        return await bxAuth.refresh()
    } else {
        const res = await axios.get(BASE_URL + 'api/auth/login/?' + authData)
        if(res.data.ok){
            return await bxAuth.refresh()
        }
        return false
    }
}

//@ts-ignore
window.refreshSession = refreshSession
