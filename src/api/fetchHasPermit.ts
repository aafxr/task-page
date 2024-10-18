import axios from "axios";
import {BXPerson} from "../classes/BXPerson";
import {errors} from "../errors";
import {BASE_URL} from "../App";

export async function fetchHasPermit(authData: string = Telegram.WebApp.initData): Promise<{ok: boolean, user?: BXPerson}>{
    try{
        const res = await axios.get(BASE_URL + 'api/auth/hasPermit/?' + authData)
        if(res.status === 200 && res.data.ok){
            return {ok: res.data.ok, user: new BXPerson(res.data.user)}
        }
        return {ok: false}
    } catch (e){
        if(axios.isAxiosError(e) && e.status === 401) throw new Error(errors.UNAUTHORIZED)
        throw e
    }
}