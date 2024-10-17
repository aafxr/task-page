import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchTasks, fetchTaskTypes} from "../api";
import {TaskType} from "../classes/TaskType";
import {bitrix, bxAuth} from "../bitrix";
import {fetchAddTask} from "../api/fetchAddTask";
import {fetchUpdateTask} from "../api/fetchUpdateTask";


export class TaskService {
    /**
     * список задач на дату
     * @param ctx
     */
    static getTasks(ctx: AppContextState) {
        (async () => {
            try {
                let auth = await bitrix.getAuth()
                if(!auth) {
                    await bxAuth.auth()
                    auth = await bitrix.getAuth()
                }
                if(!auth) return
                const user_id = auth.user_id
                ctx.updateAppContext( s => ({...s, tasksLoading: true, tasks: []}))

                //--------------------------- new api ------------------------------------------------------
                const tasks = await fetchTasks('' + user_id, ctx.selectedDay)
                console.log('tasks ',tasks)
                //@ts-ignore
                window.tasks = tasks
                ctx.updateAppContext(s => ({...s, tasks}))
                //--------------------------- new api end --------------------------------------------------
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
        // @ts-ignore
        const partTask = Object.entries(task).reduce((a, [k, v]) => {
            if (v) a[k] = v
            return a
        }, {} as Record<string, any>)

        try {
            const bxTask = Task.transformToBitrixFields(partTask)
            console.log('add task fields: ', bxTask)

            //--------------------------- new api ------------------------------------------------------
            const task = await fetchAddTask(bxTask)
            return task?.id
            //--------------------------- new api end --------------------------------------------------
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
            if (!originTask) throw new Error(`Задача с ид ${task.id} не найдена`)

            if (nextTask) {
                task.ufNextTask = await TaskService.add(ctx, nextTask)
            }
            let partTaskFields: any = {}

            for (const k in task) {
                //@ts-ignore
                if (task[k] !== originTask[k]) partTaskFields[k] = task[k]
            }
            partTaskFields.id = task.id

            const fields = Task.transformToBitrixFields(partTaskFields)
            console.log("update fields: ", fields)

            //--------------------------- new api ------------------------------------------------------
            const res = await fetchUpdateTask(fields, task.files)
            console.log(res)
            return true
            //--------------------------- new api end --------------------------------------------------
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
            ctx.updateAppContext(p => ({...p, reportSending: true}))
            task.status = Task.STATE_COMPLETED
            if (!task.isClosed()) {
                task.closedDate = new Date()
                if (task.closePrevDay) {
                    task.closedDate.setDate(task.closedDate.getDate() - 1)
                }
            }
            const res = await TaskService.update(ctx, task, nextTask)
            if (res) TaskService.getTasks(ctx)
            return res
        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
        } finally {
            ctx.updateAppContext(p => ({...p, reportSending: false}))
        }
    }


    static async getTaskTypes(ctx: AppContextState, task?: Task): Promise<TaskType[]> {
        try {
            const responsibleId = task?.responsibleId || ctx.user?.ID
            const taskId = task?.id || '0'
            if (!responsibleId) return []

            const types = await fetchTaskTypes(responsibleId, taskId)
            return types.map(t => new TaskType(t))
        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
            return []
        }
    }
}


//@ts-ignore
window.TaskService = TaskService