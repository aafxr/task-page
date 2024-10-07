import axios from "axios";
import {BASE_URL} from "../App";

export async function fetchLogin(authData: string = Telegram.WebApp.initData): Promise<boolean>{
    const res = await axios.get(BASE_URL + 'api/auth/login/?' + authData)
    return res.status === 200 && res.data.ok
}