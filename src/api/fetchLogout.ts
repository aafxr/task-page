import axios from "axios";
import {BASE_URL} from "../App";

export async function fetchLogout(){
    const res = await axios.get(BASE_URL + 'api/auth/logout/')
    return res.status === 200 && res.data.ok
}