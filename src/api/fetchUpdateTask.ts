import {appFetch} from "../axios";
import {APiResponse} from "../../@types/APiResponse";
import {Task} from "../classes/Task";
import {BASE_URL} from "../App";
import axios from "axios";

type FetchUpdateTaskResponse = {
    task: Task
    nextTask?: Task
}

export async function fetchUpdateTask(taskFields: Object, files: File[] = [], nextTaskFields?: Object, closePrevDate = false) {
    const payload: any = {task: taskFields}
    if (nextTaskFields) payload['nextTask'] = nextTaskFields
    if (closePrevDate) payload['taskClosePrevDate'] = closePrevDate

    const fd = new FormData()
    fd.set('request', JSON.stringify(payload))
    files.forEach((f, i) => fd.append('file_' + i, f))
    const res = await appFetch.post<APiResponse<FetchUpdateTaskResponse>>(BASE_URL + 'api/tasks/update/', fd)

    if (res.status > 199 && res.status < 300) {
        if (res.data.ok) {
            const result: FetchUpdateTaskResponse = {
                task: new Task(res.data.result.task)
            }
            if (res.data.result.nextTask) result.nextTask = new Task(res.data.result.nextTask)
            return result
        }
        throw new Error(res.data.message)
    }
    if (axios.isAxiosError(res)) throw new Error(res.message)
    return []
}