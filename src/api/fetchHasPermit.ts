import axios from "axios";
import {BASE_URL} from "../App";

export async function fetchHasPermit(authData: string = Telegram.WebApp.initData): Promise<boolean>{
    const res = await axios.get(BASE_URL + 'api/auth/hasPermit/?' + authData)
    return res.status === 200 && res.data.ok
}