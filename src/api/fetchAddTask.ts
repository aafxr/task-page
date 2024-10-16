import {Task} from "../classes/Task";
import {appFetch} from "../axios";
import {APiResponse} from "../../@types/APiResponse";
import {BASE_URL} from "../App";
import axios from "axios";

export async function fetchAddTask(fields: Object){
    const res = await appFetch.post<APiResponse<Task>>(BASE_URL + 'api/tasks/new/',fields)
    if(res.status > 199 && res.status < 300){
        if (res.data.ok){
            return new Task(res.data.result)
        }
        throw new Error(res.data.message)
    }
    if(axios.isAxiosError(res)) throw new Error(res.message)
}