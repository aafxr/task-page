import {Task} from "../classes/Task";

export function fetchTasks(filter: Object): Promise<Task[]> {
    return new Promise((resolve, reject) => {
        if (!window.BX24) throw new Error('bx24 not allowed')
        window.BX24.callMethod(
            'tasks.task.list',
            filter,
            (res: any) =>  {
                if (res.error()) {
                    reject(res.error());
                } else {
                    resolve(res.answer.result);
                }
            }
        );
    })


}