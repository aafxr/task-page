import {BASE_URL} from "../App";
import {appFetch} from "../axios";

export async function fetchIsAuthorized(): Promise<boolean>{
    const res = await appFetch.get(BASE_URL + 'api/auth/isAuthorized/')
    return res.data.ok
}