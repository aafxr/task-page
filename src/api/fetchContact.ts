import axios from "axios";

import {APiResponse} from "../../@types/APiResponse";
import {BXContact} from "../classes/BXContact";
import {appFetch} from "../axios";
import {BASE_URL} from "../App";

export async function fetchContact(id: string){
    const res = await appFetch.post<APiResponse<BXContact>>(BASE_URL + 'api/contact/getById/', {id})
    if(res.status > 199 && res.status < 300){
        if (res.data.ok){
            return new BXContact(res.data.result)
        }
        throw new Error(res.data.message)
    }
    if(axios.isAxiosError(res)) throw new Error(res.message)
}