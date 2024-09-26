import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchRestAPI, fetchTasks} from "../api";
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
     * добавить задачу
     * @param ctx
     * @param task
     */
    static async add(ctx: AppContextState, task: Task) {
        try {
            const bxTask = Task.transformToBitrixFields(task)
            const res = await fetchRestAPI<{task:Task}>('tasks.task.add', {fields: bxTask})
            return res.result.task.id
        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }


    /**
     * Метод обновляет задачу.
     * @param ctx
     * @param task
     * @param nextTask
     */
    static async update(ctx: AppContextState, task: Task, nextTask?: Task) {
        try {
            const originTask = ctx.tasks.find(t => t.id === task.id)
            if(!originTask) return false

            if(nextTask){
                task.ufNextTask = await TaskService.add(ctx, nextTask)
            }
            let partTaskFields: any = {}

            for(const k in task){
                //@ts-ignore
                if(task[k] !== originTask[k]) partTaskFields[k] = task[k]
            }

            await fetchRestAPI('tasks.task.update', {
                taskId:originTask.id,
                fields: Task.transformToBitrixFields(partTaskFields)
            })
            return true
        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }

    /**
     * Закрывает текущуюзадачу (task), обновлет изменентя в task и создает nextTask
     * @param ctx
     * @param task
     * @param nextTask
     */
    static async closeAndUpdate(ctx: AppContextState, task: Task, nextTask?: Task) {
        try {
            task.status = Task.STATE_COMPLETED
            return await TaskService.update(ctx, task, nextTask)
        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        }
    }


    static async getTaskTypes(ctx: AppContextState, task: Task): Promise<TaskType[]> {
        const types = await fetchTaskTypes(task.responsibleId, task.id)
        return types.map(t => new TaskType(t))
    }


}
