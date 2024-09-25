import {bitrix} from "../bitrix";
import {IBXSuccessResponse} from "../bitrix/@types";
import {BXPerson} from "../classes/BXPerson";

export function fetchUsers(filter: Object = {}): Promise<IBXSuccessResponse<BXPerson[]>> {
    return new Promise((resolve, reject) => {
        bitrix.callMethod('user.search', filter, (r) => {
            if('error' in r){
                reject(new Error(r.error))
            } else{
                resolve(r)
            }
        }, reject)
    })
}