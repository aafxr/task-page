import {appFetch} from "../axios";
import {APiResponse} from "../../@types/APiResponse";
import {BXCompany} from "../classes/BXCompany";
import {BASE_URL} from "../App";
import axios from "axios";

export async function fetchCompany(id: string){
    const res = await appFetch.post<APiResponse<BXCompany>>(BASE_URL + 'api/company/getById/', {id})
    if(res.status > 199 && res.status < 300){
        if (res.data.ok){
            return new BXCompany(res.data.result)
        }
        throw new Error(res.data.message)
    }
    if(axios.isAxiosError(res)) throw new Error(res.message)
}