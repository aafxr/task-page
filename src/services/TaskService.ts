import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchTasks} from "../api";
import {bitrix} from "../bitrix";
import App from "../App";
import {TaskReport} from "../classes/TaskReport";

let nextTasks = 0


export class TaskService {
    /**
     * список задач на дату
     * @param ctx
     * @param next
     */
    static getTasks(ctx: AppContextState, next = false) {
        (async () => {
            try {
                ctx.updateAppContext(({...ctx, /*tasks: [], */ tasksLoading: true}))

                if (!next) nextTasks = 0;

                const user_id = (await bitrix.getAuth()).user_id

                const filter = {
                    filter: {
                        RESPONSIBLE_ID: user_id,
                        '<STATUS': 5
                    },
                    order: {
                        DEADLINE: 'desc',
                        CREATED_DATE: 'desc',
                    },
                    start: nextTasks
                }

                const response = await fetchTasks(filter)
                nextTasks = response.next

                const tasks = response.result.tasks.map(t => new Task(t))

                ctx.updateAppContext(s => ({
                    ...s,
                    tasks: nextTasks ? [...ctx.tasks, ...tasks] : tasks,
                    tasksLoading: false
                }))
            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            } finally {
                ctx.updateAppContext(s => ({...s, tasksLoading: false}))
            }
        })()
    }


    /**
     * Метод переводит задачу в статус «выполняется».
     * @param ctx
     * @param task
     */
    static async start(ctx: AppContextState, task: Task) {
        try {

        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }

    /**
     * Метод переводит задачу в статус «завершена».
     * @param ctx
     * @param task
     */
    static async complete(ctx: AppContextState, task: Task) {
        try {

        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }

    /**
     * Метод обновляет задачу.
     * @param ctx
     * @param task
     */
    static async update(ctx: AppContextState, task: Task) {
        try {

        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }



    static async updateReport(ctx: AppContextState, r: TaskReport){
        try {

        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }



}