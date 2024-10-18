import {BASE_URL} from "../App";
import {appFetch} from "../axios";

export async function fetchLogout(){
    const res = await appFetch.get(BASE_URL + 'api/auth/logout/')
    return res.status === 200 && res.data.ok
}