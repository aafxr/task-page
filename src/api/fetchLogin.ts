import axios from "axios";
import {BASE_URL} from "../App";
import {BXPerson} from "../classes/BXPerson";

export async function fetchLogin(authData: string = Telegram.WebApp.initData): Promise<BXPerson | undefined>{
    const res = await axios.get(BASE_URL + 'api/auth/login/?' + authData)
    return res.status === 200 ? new BXPerson(res.data.user) : undefined
}