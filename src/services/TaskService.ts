import {Task} from "../classes/Task";
import {fetchTasks} from "../api";
import {AppContextState} from "../context/AppContext";
import {bitrix} from "../bitrix";

let nextTasks = 0


export class TaskService {
    /**
     * список задач на дату
     * @param ctx
     * @param next
     */
    static async getTasks(ctx: AppContextState, next = false): Promise<Task[]> {
        ctx.updateAppContext(({...ctx, /*tasks: [], */ tasksLoading: true}))

        if (!next) nextTasks = 0;

        const today = new Date(ctx.selectedDay);

        const user_id = (await bitrix.getAuth()).user_id

        const filter = {
            filter: {
                RESPONSIBLE_ID: user_id,
                '<STATUS':5
            },
            order: {
                DEADLINE:'desc',
                CREATED_DATE:'desc',
            },
            start: nextTasks
        }

        const response = await fetchTasks(filter)
        nextTasks = response.next

        return response.result.tasks.map(t => new Task(t));
    }



    /**
     * Метод переводит задачу в статус «выполняется».
     * @param ctx
     * @param task
     */
    static async start(ctx: AppContextState, task: Task){

    }

    /**
     * Метод переводит задачу в статус «завершена».
     * @param ctx
     * @param task
     */
    static async complete(ctx: AppContextState, task: Task){

    }

    /**
     * Метод обновляет задачу.
     * @param ctx
     * @param task
     */
    static async update(ctx: AppContextState, task: Task){

    }



}