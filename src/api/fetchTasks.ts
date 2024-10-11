import {Task} from "../classes/Task";
import {appFetch} from "../axios";
import {BASE_URL} from "../App";

export async function fetchTasks(userId: string, date: Date): Promise<Task[]> {
    const res = await appFetch.post(BASE_URL + 'api/tasks/getList/', {userId, date: date.toISOString()})

    if(res.status > 199 && res.status < 300 ) {
        if (res.data.ok){
            return Array.isArray(res.data.result)
                //@ts-ignore
                ? res.data.result.map(t => new Task(t))
                : []
        }else{
            throw new Error(res.data.message)
        }
    }
    return []
}