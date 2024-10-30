import {appFetch} from "../axios";
import {APiResponse} from "../../@types/APiResponse";
import {BXContact} from "../classes/BXContact";
import axios from "axios";

export async function fetchContactsListByCompany(){
    const res = await appFetch.post<APiResponse<BXContact[]>>('api/contact/getList/')
    if(axios.isAxiosError(res)) throw new Error(res.message)
    if (res.status > 199 && res.status < 300 ){
        if (res.data.ok){
            return res.data.result.map(e => new BXContact(e))
        }
        throw new Error(res.data.message)
    }
    return []
}