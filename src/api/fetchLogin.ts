import {BASE_URL} from "../App";
import {BXPerson} from "../classes/BXPerson";
import {appFetch} from "../axios";

export async function fetchLogin(authData: string = Telegram.WebApp.initData): Promise<BXPerson | undefined>{
    const res = await appFetch.get(BASE_URL + 'api/auth/login/?' + authData)
    return res.status === 200 ? new BXPerson(res.data.user) : undefined
}