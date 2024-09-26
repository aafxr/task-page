import {bitrix} from "../bitrix";
import {IBXSuccessResponse} from "../bitrix/@types";

export function fetchRestAPI<T>(method: string, filter: Object = {}): Promise<IBXSuccessResponse<T>>{
    return new Promise((resolve, reject) => {
        bitrix.callMethod(method, filter, (r) => {
            if('error' in r){
                reject(new Error(r.error))
            } else{
                resolve(r)
            }
        }, reject)
    })
}