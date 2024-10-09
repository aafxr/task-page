import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchRestAPI, fetchTasks} from "../api";
import {IBXSuccessResponse} from "../bitrix/@types";
import {TaskType} from "../classes/TaskType";
import {fetchTaskTypes} from "../api";
import {bitrix, bxAuth} from "../bitrix";
import {ContactService} from "./ContactService";
import {fetchFindFolder} from "../api/fetchFindFolder";
import {BXFolder} from "../classes/BXFolder";


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
                console.log('auth' , auth)
                if(!auth) return
                const user_id = auth.user_id
                ctx.updateAppContext(({...ctx, /*tasks: [], */ tasksLoading: true, tasks: []}))

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

                d.setHours(0, 0, 0, 0)
                if (dateEnd.valueOf() < d.valueOf()) periodType = 1

                d.setHours(23, 59, 59, 999)
                if (dateStart.valueOf() > d.valueOf()) periodType = 3

                let request: any = {}

                let tasks: Task[] = []

                if (periodType === 1) {
                    // прошедшие задачи
                    request = {
                        filter: {
                            '>=CLOSED_DATE': dateStart.toISOString(),
                            '<CLOSED_DATE': dateEnd.toISOString(),
                            RESPONSIBLE_ID: user_id
                        },
                        order: {
                            CREATED_DATE: 'DESC',
                        },
                        select: ['*', 'UF_*']
                    }

                    tasks = await TaskService._loadTasks(request)

                } else if (periodType === 2) {
                    // задачи на сегодня

                    // let requestDeadlineNotSet = {
                    //     filter: {
                    //         "DEADLINE": '',
                    //         '<REAL_STATUS': Task.STATE_COMPLETED,
                    //         RESPONSIBLE_ID: user_id,
                    //     },
                    //     order: {
                    //         DEADLINE: 'DESC',
                    //         CREATED_DATE: 'DESC'
                    //     },
                    //     select: ['*', 'UF_*']
                    // }

                    let requestDeadline = {
                        filter: {
                            "<DEADLINE": dateEnd.toISOString(),
                            '<REAL_STATUS': Task.STATE_COMPLETED,
                            RESPONSIBLE_ID: user_id,
                        },
                        order: {
                            DEADLINE: 'DESC',
                            CREATED_DATE: 'DESC'
                        },
                        select: ['*', 'UF_*']
                    }



                    let requestClosed = {
                        filter: {
                            '<CLOSED_DATE': dateEnd.toISOString(),
                            '>=CLOSED_DATE': dateStart.toISOString(),
                            RESPONSIBLE_ID: user_id
                        },
                        order: {
                            CLOSED_DATE: 'DESC',
                        },
                        select: ['*', 'UF_*']
                    }


                    await Promise.all([
                        // TaskService._loadTasks(requestDeadlineNotSet)
                        //     .then(t => ctx.updateAppContext(s => {
                        //         if(!s.tasks.length) return {...s, tasks: t, tasksLoading: false}
                        //         if(s.tasks[0].deadline){
                        //             let i = 0
                        //             while(s.tasks[i].deadline) i++
                        //             return {...s, tasksLoading: false, tasks: [...s.tasks.slice(0,i), ...t, ...s.tasks.slice(i+1)]}
                        //         }
                        //         return {...s, tasksLoading: false, tasks: [ ...t, ...s.tasks]}
                        //     })),
                        TaskService._loadTasks(requestDeadline)
                            .then(t => ctx.updateAppContext(s => ({...s, tasks: [...t, ...s.tasks]}))),
                        TaskService._loadTasks(requestClosed)
                            .then(t =>  ctx.updateAppContext(s => ({...s, tasks: [ ...s.tasks, ...t]})))
                    ])
                        .finally(() => ctx.updateAppContext(s => ({...s, tasksLoading: false})))

                    return
                } else {
                    //задачи на завтра
                    request = {
                        filter: {
                            '<DEADLINE': dateEnd.toISOString(),
                            '>=DEADLINE': dateStart.toISOString(),
                            '<REAL_STATUS': Task.STATE_COMPLETED,
                            RESPONSIBLE_ID: user_id
                        },
                        order: {
                            DEADLINE: 'DESC',
                            CREATED_DATE: 'DESC',
                        },
                        select: ['*', 'UF_*']
                    }
                    tasks = await TaskService._loadTasks(request)
                }


                // сортировка задач без дедлайн ------------------------------
                // const idx = tasks.findIndex(t => !t.deadline)
                // if(idx !== -1){
                //     const subtasks =tasks.slice(idx)
                //     //@ts-ignore
                //     subtasks.sort((a,b) => (a.createdDate - b.createdDate) * -1)
                //     tasks.splice(idx, tasks.length - idx, ...subtasks)
                // }
                // сортировка задач без дедлайн ------------------------------

                ctx.updateAppContext(s => ({...s, tasks}))

            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            } finally {
                ctx.updateAppContext(s => ({...s, tasksLoading: false}))
            }
        })()
    }

    static async _loadTasks(request: any = {}) {
        // загрузка всех задач
        let next = 0
        let res: IBXSuccessResponse<{ tasks: Task[] }>
        let tasks: Task[] = []

        do {
            request.start = next
            res = await fetchTasks(request)
            next = res.next
            tasks = tasks.concat(res.result.tasks.map(t => new Task(t)))
        } while (next < res.total)
        return tasks
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
            const partTask = Object.entries(task).reduce((a, [k, v]) => {
                if (v) a[k] = v
                return a
            }, {} as Record<string, any>)

            const bxTask = Task.transformToBitrixFields(partTask)
            console.log('add task fields: ', bxTask)
            const res = await fetchRestAPI<{ task: Task }>('tasks.task.add', {fields: bxTask})
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
            if (!originTask) return false

            if (nextTask) {
                task.ufNextTask = await TaskService.add(ctx, nextTask)
            }
            let partTaskFields: any = {}

            for (const k in task) {
                //@ts-ignore
                if (task[k] !== originTask[k]) partTaskFields[k] = task[k]
            }

            const fields = Task.transformToBitrixFields(partTaskFields)
            console.log("update fields: ", fields)

            console.log('update method result: ',
                await fetchRestAPI('tasks.task.update', {taskId: originTask.id, fields})
            )
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
            ctx.updateAppContext(p => ({...p, reportSending: true}))
            task.status = Task.STATE_COMPLETED
            if (!task.isClosed()) {
                task.closedDate = new Date()
                if (task.closePrevDay) {
                    task.closedDate.setDate(task.closedDate.getDate() - 1)
                }
            }

            if(task.ufCrmTask.length){
                const company = await ContactService.getCompany(ctx, task.ufCrmTask[0])
                if(company) {
                    const folderName = `${company.TITLE} [C${company.ID}]`
                    const foldersResponse = await fetchFindFolder(folderName)
                    if(foldersResponse && foldersResponse.crm){
                        const  crmFolder : BXFolder = foldersResponse.crm
                        let folder : BXFolder
                        if(foldersResponse.folder) folder = foldersResponse.folder
                        else {
                            const r = await fetchRestAPI<BXFolder>("disk.folder.addsubfolder", { id: crmFolder.ID, data: {NAME: folderName, CREATED_BY: 1} } )
                            folder = new BXFolder(r.result)
                        }
                        // const r = await fetchRestAPI<BXFolder>("disk.folder.addsubfolder", { id: folder.ID, data: {NAME: 'Задачи', CREATED_BY: 1} } )
                        // let taskFolder = new BXFolder(r.result)

                        await Promise.all([
                            task.files.map(f => {
                                const dt = new DataTransfer()
                                dt.items.add(f)
                                const inputElement = document.createElement('input');
                                inputElement.type = 'file';
                                inputElement.files = dt.files;
                                return fetchRestAPI("disk.folder.uploadfile", {
                                    id: folder.ID,
                                    data: {NAME: f.name},
                                    fileContent: inputElement,
                                    generateUniqueName: true,
                                })
                            })
                        ])
                    }
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


    static async getTaskTypes(ctx: AppContextState, task: Task): Promise<TaskType[]> {
        try {
            const types = await fetchTaskTypes(task.responsibleId, task.id)
            return types.map(t => new TaskType(t))
        } catch (e) {
            ErrorService.handleError(ctx)(e as Error)
            return []
        }
    }
}
