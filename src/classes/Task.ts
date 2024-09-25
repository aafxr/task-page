import {TaskPerson} from "./TaskPerson";

export class Task {
    static STATE_NEW = 1;
    static STATE_PENDING = 2;
    static STATE_IN_PROGRESS = 3;
    static STATE_SUPPOSEDLY_COMPLETED = 4;
    static STATE_COMPLETED = 5;
    static STATE_DEFERRED = 6;
    static STATE_DECLINED = 7;

    id: string = ''
    parentId: any | null = null
    title: string = ''
    description: string = ''
    mark: any | null = null
    priority: string = ''
    status: string = ''
    multitask: string = ''
    notViewed: string = ''
    replicate: string = ''
    groupId: string = ''
    stageId: string = ''
    createdBy: string = ''
    createdDate: Date | null = null
    responsibleId: string = ''
    changedBy: string = ''
    changedDate: Date | null = null
    statusChangedBy: string = ''
    statusChangedDate: Date | null = null
    closedBy: string | null = null
    closedDate: Date | null = null
    dateStart: Date | null = null
    deadline: Date | null = null
    startDatePlan: Date | null = null
    endDatePlan: Date | null = null
    guid: string = ''
    xmlId: any | null = null
    commentsCount: number | null = null
    taskControl: string = ''
    addInReport: string = ''
    forkedByTemplateId: any | null = null
    timeEstimate: string = ''
    timeSpentInLogs: any | null = null
    matchWorkTime: string = ''
    forumTopicId: any | null = null
    forumId: any | null = null
    siteId: string = ''
    subordinate: string = ''
    favorite: string = ''
    exchangeModified: any | null = null
    exchangeId: any | null = null
    outlookVersion: string = ''
    viewedDate: Date | null = null
    sorting: string | null = null
    durationPlan: any | null = null
    durationFact: any | null = null
    durationType: string = ''
    descriptionInBbcode: string = ''
    auditors: Array<any> = []
    accomplices: Array<any> = []
    newCommentsCount: number = -1
    subStatus: string = ''
    creator: TaskPerson | null = null
    responsible: TaskPerson | null = null

    ufCrmTask: Array<any> = []
    ufTaskWebdavFiles: number[] = []
    ufAuto915658270214: any | null = null
    ufAuto244510721805: any | null = null
    ufAuto637823431651: string = ''
    ufMailMessage: any | null = null
    ufAuto226929532613: string = ''
    ufAuto187628303463: any | null = null

    /** флаг задача выполнена успешно */
    ufAuto251545709641: '0' | '1' | null = null
    set success(v: boolean) { this.ufAuto251545709641 = v ? '1':'0'}
    get success(){return this.ufAuto251545709641 === '1'}

    /** тип следующей задачи */
    ufAuto274474131393: string | null = null
    set nextTaskType(v:string){this.ufAuto274474131393 = v}
    get nextTaskType(){return this.ufAuto274474131393 || ''}

    /** результат выполнения задачи */
    ufAuto280393729397: string | null = null
    set report(v:string){this.ufAuto280393729397 = v}
    get report(){return this.ufAuto280393729397 || ''}

    ufAuto616972454340: any | null = null
    ufAuto645211693582: any | null = null
    ufAuto719191965958: any | null = null
    /** важная / не важная, срочная, не срочная */
    ufAuto851551329931: string = 'не важная, не срочная'
    set importenet(v: boolean){
        const [_, urg] = this.ufAuto851551329931.split(',')
        this.ufAuto851551329931 = v ? 'важная' : 'не важная'
        this.ufAuto851551329931 += ',' + urg
    }

    get importenet(){
        return this.ufAuto851551329931.startsWith('важная')
    }

    set urgent(v: boolean){
        const [imp, _] = this.ufAuto851551329931.split(',')
        this.ufAuto851551329931 = imp + ', ' + v ? 'важная' : 'не важная'
    }

    get urgent(){
        return this.ufAuto851551329931.endsWith('важная')
    }

    ufColor: any | null = null
    ufCrmTaskContact: any | false = false
    ufNextTask: any | null = null
    ufPreviewText: any | null = null
    ufTaskReport: any | null = null

    /** время затраченное на задачу */
    ufTaskTime: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'  = '0'
    set taskTime(v:Task['ufTaskTime']){
        this.ufTaskTime = v
    }

    get taskTime(){return this.ufTaskTime}

    flowId: any | null = null
    serviceCommentsCount: number | null = null

    constructor(t: Partial<Task> = {}) {
        Object.keys(t)
            .forEach((k) => {
                //@ts-ignore
                if (t[k] !== undefined) {
                    if (k.startsWith('date') || k.includes('Date') || k === 'deadline') {
                        //@ts-ignore
                        this[k] = new Date(t[k])
                        return
                    }
                    //@ts-ignore
                    this[k] = t[k]
                }
            })
    }


    isClosed() {
        return !!this.closedDate && this.closedDate.valueOf() > 0
    }

    isExpired() {
        return !!this.deadline && this.deadline.valueOf() < new Date().valueOf()
    }

    hasContact() {
        return this['ufCrmTask'] && !!this['ufCrmTask'].length
    }

    getContact() {
        return this['ufCrmTask']?.[0]
    }

    getContactType() {
        const [prefix, _] = this['ufCrmTask']?.[0].split('_') || []
        switch (prefix) {
            case 'CO':
                return 'COMPANY'
            default:
                return ''
        }
    }

    getContactId() {
        const [_, id] = this['ufCrmTask']?.[0].split('_') || []
        return id || ''
    }
}
