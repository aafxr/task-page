import axios from "axios";
import {BASE_URL} from "../App";

export async function fetchIsAuthorized(): Promise<boolean>{
    const res = await axios.get(BASE_URL + 'api/auth/isAuthorized/')
    return res.data.ok
}