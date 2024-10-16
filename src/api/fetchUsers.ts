import axios from "axios";

import {APiResponse} from "../../@types/APiResponse";
import {BXPerson} from "../classes/BXPerson";
import {appFetch} from "../axios";
import {BASE_URL} from "../App";

export async function fetchUsers(): Promise<BXPerson[]> {
    const res = await appFetch.get<APiResponse<BXPerson[]>>(BASE_URL + 'api/persons/')
    if(res.status > 199 && res.status < 300){
        if (res.data.ok){
            return res.data.result.map(t => new BXPerson(t))
        }
        throw new Error(res.data.message)
    }
    if(axios.isAxiosError(res)) throw new Error(res.message)
    return []

    // return new Promise((resolve, reject) => {
    //     bitrix.callMethod('user.search', filter, (r) => {
    //         if('error' in r){
    //             reject(new Error(r.error))
    //         } else{
    //             resolve(r)
    //         }
    //     }, reject)
    // })
}