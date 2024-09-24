import {NextTask} from "./NextTask";

export class TaskReport {
    taskId: string
    fields: {
        UF_FIELD_RESULT: string
        UF_FIELD_SUCCESS: boolean
        UF_FIELD_TIME: number
    }
    taskClosePrevDate?: boolean
    taskNextTypeId?: number
    nextTask: NextTask | null = null

    constructor(tr: Partial<TaskReport> = {}) {
        this.taskId = tr.taskId ? tr.taskId : ''
        this.fields = {
            UF_FIELD_RESULT: '',
            UF_FIELD_SUCCESS: false,
            UF_FIELD_TIME: 1
        }
        if(tr.fields) {
            this.fields.UF_FIELD_RESULT = tr.fields.UF_FIELD_RESULT
            this.fields.UF_FIELD_SUCCESS = tr.fields.UF_FIELD_SUCCESS
            this.fields.UF_FIELD_TIME = tr.fields.UF_FIELD_TIME
        }

        if(tr.taskClosePrevDate) this.taskClosePrevDate = tr.taskClosePrevDate
        if(tr.taskNextTypeId) this.taskNextTypeId = tr.taskNextTypeId

        if(tr.nextTask) this.nextTask = tr.nextTask
    }
}