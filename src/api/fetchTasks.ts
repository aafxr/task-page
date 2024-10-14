import {Task} from "../classes/Task";
import {IBXResponse, IBXSuccessResponse} from "../bitrix/@types";
import {bitrix} from "../bitrix";

export async function fetchTasks(filter: Object): Promise<IBXSuccessResponse<{tasks: Task[]}>> {
    return new Promise((resolve, reject) => {
        bitrix.callMethod('tasks.task.list', filter, (r: IBXResponse<{tasks: Task[]}>) => {
            if('error' in r){
                reject(new Error(r.error))
            } else{
                resolve(r)
            }
        })
    })
    // const res = await appFetch.post(BASE_URL + 'api/tasks/getList/', {userId, date: date.toISOString()})
    //
    // if(res.status > 199 && res.status < 300 ) {
    //     if (res.data.ok){
    //         return Array.isArray(res.data.result)
    //             //@ts-ignore
    //             ? res.data.result.map(t => new Task(t))
    //             : []
    //     }else{
    //         throw new Error(res.data.message)
    //     }
    // }
    // return []
}