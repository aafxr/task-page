import axios from "axios";
import {BASE_URL} from "../App";
import {BXPerson} from "../classes/BXPerson";

export async function fetchHasPermit(authData: string = Telegram.WebApp.initData): Promise<{ok: boolean, user?: BXPerson}>{
    const res = await axios.get(BASE_URL + 'api/auth/hasPermit/?' + authData)
    if(res.status === 200 && res.data.ok){
        return {ok: res.data.ok, user: new BXPerson(res.data.user)}
    }
    return {ok: false}
}