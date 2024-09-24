import {useAppContext} from "../context/AppContext";
import {Task} from "../classes/Task";

export function useReport(task: Task){
    return useAppContext().reports.find(r => r.taskId === task.id)
}