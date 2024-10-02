import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {bxAuth} from "../bitrix";
import {errors} from "../errors";

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
            if (await bxAuth.refresh()) {
                const idx = originalRequest.url?.indexOf(AUTH)
                if(idx && idx !== -1) originalRequest.url = originalRequest.url!.slice(0, idx + AUTH.length) + bxAuth.oauthData?.access_token
                return appFetch(originalRequest)
            }
        } catch (e) {
            return Promise.reject(new Error(errors.UNAUTHORIZED))
        }
    }
    return Promise.reject(err)
})


// //авторелоад
// if (!originalRequest._retry){
//     originalRequest._retry = true
//     try {
//         if (await bxAuth.refresh()) return appFetch(originalRequest)
//     } catch (e) {
//         return Promise.reject(new Error(errors.UNAUTHORIZED))
//     }
//
// }else{
//     if(global['localStorage'] && global['location']){
//         const d = new Date()
//         const tm = +localStorage['refreshTime']
//
//         if(tm && d.valueOf() - tm < 5000){
//             localStorage.removeItem('refreshTime')
//         }else{
//             localStorage.setItem('refreshTime', d.valueOf().toString())
//             window.location.reload()
//         }
//     }
// }