import {Task} from "../classes/Task";
import {bitrix} from "../bitrix";
import {IBXResponse, IBXSuccessResponse} from "../bitrix/@types";

export function fetchTasks(filter: Object): Promise<IBXSuccessResponse<{tasks: Task[]}>> {
    return new Promise((resolve, reject) => {
        bitrix.callMethod('tasks.task.list', filter, (r: IBXResponse<{tasks: Task[]}>) => {
            if('error' in r){
                reject(new Error(r.error))
            } else{
                resolve(r)
            }
        })
    })


}