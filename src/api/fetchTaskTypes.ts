import {BASE_URL} from "../App";
import {TaskType} from "../classes/TaskType";
import {appFetch} from "../axios";
import {AxiosResponse} from "axios";

export async function fetchTaskTypes(user_id:string, task_id:string):Promise<TaskType[]> {
    const res = await appFetch.post(BASE_URL + 'taskType/', {user_id,task_id}) as AxiosResponse
    if(res.status >=200 &&  res.status < 300){
        return res.data.ok ? Object.values(res.data.result) : []
    }
    return []
}