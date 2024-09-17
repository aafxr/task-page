import {Task} from "../classes/Task";
import {bitrix} from "../bitrix";

export function fetchTasks(filter: Object): Promise<Task[]> {
    return new Promise((resolve, reject) => {
        if (!bitrix) throw new Error('bx24 not allowed')
        // bitrix.deals.get('212')
        //     .then(console.log)
        //     .then(() => resolve([]))

        resolve([])
        // callMethod(
        //     'tasks.task.list',
        //     filter,
        //     (res: any) =>  {
        //         if (res.error()) {
        //             reject(res.error());
        //         } else {
        //             resolve(res.answer.result);
        //         }
        //     }
        // );
    })


}