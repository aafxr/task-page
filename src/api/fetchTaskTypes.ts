import {BASE_URL} from "../App";
import {TaskType} from "../classes/TaskType";

export async function fetchTaskTypes(user_id:string, task_id:string):Promise<TaskType[]> {
    const res = await fetch(BASE_URL + 'taskType/',{
        method: 'POST',
        body:JSON.stringify({user_id,task_id}),
    })
    const data = await res.json()
    return data.ok ? Object.values(data.result) : []
}