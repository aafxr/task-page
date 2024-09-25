import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchTasks} from "../api";
import {bitrix} from "../bitrix";
import App from "../App";
import {TaskReport} from "../classes/TaskReport";
import {IBXSuccessResponse} from "../bitrix/@types";
import {TaskType} from "../classes/TaskType";
import {fetchTaskTypes} from "../api/fetchTaskTypes";

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

                const d = new Date()

                const dateStart = new Date(ctx.selectedDay)
                dateStart.setHours(0, 0, 0, 0)
                const dateEnd = new Date(dateStart)
                dateEnd.setHours(23, 59, 59, 999)


                /**
                 *  условия
                 *  1. дата отбора < текущей = показываем только закрытые задачи, за заданный период
                 *  2. дата отбора = текущей = показываем задачи на сегодня, и все не закрытые задачи за прошлые даты
                 *  3. дата отбора > текущей = показываем все задачи на заданный период
                 */

                let periodType = 2

                d.setHours(0,0,0,0)
                if(dateEnd.valueOf() < d.valueOf()) periodType = 1

                d.setHours(23,59,59,999)
                if(dateStart.valueOf() > d.valueOf()) periodType = 3

                let request: any = {}

                if(periodType === 1){
                    // прошедшие задачи
                    request = {
                        filter: {
                            '>=CLOSED_DATE': dateStart.toISOString(),
                            '<=CLOSED_DATE': dateEnd.toISOString(),
                            RESPONSIBLE_ID: 212
                        },
                        order: {
                            CREATED_DATE: 'DESC',
                        },
                        select: ['*', 'UF_*']
                    }
                } else if(periodType === 2){
                    // задачи на сегодня
                    request = {
                        filter: {
                            '%<=DEADLINE': dateEnd.toISOString(),
                            '<REAL_STATUS': 5,
                            RESPONSIBLE_ID: 212
                        },
                        order: {
                            CREATED_DATE: 'DESC',
                        },
                        select: ['*', 'UF_*']
                    }

                } else{
                    //задачи на завтра
                    request = {
                        filter: {
                            '<=DEADLINE': dateEnd.toISOString(),
                            '<REAL_STATUS': 5,
                            RESPONSIBLE_ID: 212
                        },
                        order: {
                            CREATED_DATE: 'DESC',
                        },
                        select: ['*', 'UF_*']
                    }

                }

                // загрузка всех задач
                let next = 0
                let res:  IBXSuccessResponse<{tasks: Task[] }>
                let tasks: Task[] = []

                do {
                    request.start = next
                    res = await fetchTasks(request)
                    next = res.next
                    tasks = tasks.concat(res.result.tasks.map(t => new Task(t)))
                }while(next < res.total)

                ctx.updateAppContext(s => ({...s, tasks}))

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


    static async updateReport(ctx: AppContextState, r: TaskReport) {
        try {

        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }


    static async getTaskTypes(ctx: AppContextState, task: Task): Promise<TaskType[]> {
        const types = await fetchTaskTypes(task.responsibleId, task.id)
        return types.map(t => new TaskType(t))
    }


}
