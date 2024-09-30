import axios, {AxiosInstance} from "axios";
import {bxAuth} from "../bitrix";
import {errors} from "../errors";

interface AxiosInstanceWithFlag extends AxiosInstance {
    refresh: boolean
}


export const appFetch = axios.create({}) as AxiosInstanceWithFlag;

//automatically refresh auth
appFetch.interceptors.response.use(r => r, async (err) => {
    const originalRequest = err.config
    if (err.response.status === 401) {
        //авторелоад
        if (!originalRequest._retry){
            originalRequest._retry = true
            try {
                if (await bxAuth.refresh()) return appFetch(originalRequest)
            } catch (e) {
                return Promise.reject(new Error(errors.UNAUTHORIZED))
            }

        }else{
            if(global['localStorage'] && global['location']){
                const d = new Date()
                const tm = +localStorage['refreshTime']

                if(tm && d.valueOf() - tm < 5000){
                    localStorage.removeItem('refreshTime')
                }else{
                    localStorage.setItem('refreshTime', d.valueOf().toString())
                    window.location.reload()
                }
            }
        }
    }
    return Promise.reject(err)
})
