import axios from "axios";
import {APiResponse} from "../../@types/APiResponse";
import {Task} from "../classes/Task";
import {appFetch} from "../axios";
import {BASE_URL} from "../App";

export async function fetchTasks(userId: string, date: Date): Promise<Task[]> {
    const res = await appFetch.post<APiResponse<Task[]>>(BASE_URL + 'api/tasks/getList/', {userId, date: date.toISOString()})
    if(res.status > 199 && res.status < 300){
        if (res.data.ok){
            return res.data.result.map(t => new Task(t))
        }
        throw new Error(res.data.message)
    }
    if(axios.isAxiosError(res)) throw new Error(res.message)
    return []

    // return new Promise((resolve, reject) => {
    //     bitrix.callMethod('tasks.task.list', filter, (r: IBXResponse<{tasks: Task[]}>) => {
    //         if('error' in r){
    //             reject(new Error(r.error))
    //         } else{
    //             resolve(r)
    //         }
    //     })
    // })
}