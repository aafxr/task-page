import {TaskPerson} from "./TaskPerson";

const toBxField = {
    id: 'ID',
    parentId: 'PARENT_ID',
    title: 'TITLE',
    description: 'DESCRIPTION',
    mark: 'MARK',
    priority:'PRIORITY',
    status:'STATTUS',
    multitask:'MULTITASK',
    // notViewed
    // replicate
    groupId:'GROUP_ID',
    stageId:'STAGE_ID',
    createdBy:'CREATE_BY',
    createdDate: 'CREATE_DATE',
    responsibleId: 'RESPONSIBLE_ID',
    changedBy:'CHANGED_BY',
    changedDate: 'CHANGED_DATE',
    statusChangedBy:'STATUS_CHANGED_BY',
    statusChangedDate: 'STATUS_CHANGED_DATE',
    closedBy: 'CLOSED_BY',
    closedDate:'CLOSED_DATE',
    dateStart:'DATE_START',
    deadline:'DEADLINE',
    startDatePlan:'START_DATE_PLAN',
    endDatePlan:'END_DATE_PLAN',
    guid: 'GUID',
    // xmlId
    commentsCount:'COMMENTS_COUNT',
    taskControl:'TASK_CONTROL',
    addInReport:'ADD_IN_REPORT',
    forkedByTemplateId:'FORKED_BY_TEMPLATE_ID',
    timeEstimate:'TIME_ESTIMATE',
    timeSpentInLogs:'TIME_SPENT_IN_LOGS',
    // matchWorkTime
    forumTopicId:'FORUM_TOPIC_ID',
    forumId: 'FORUM_ID',
    siteId:'FORUM_ID',
    subordinate:'SUBORDINATE',
    favorite:'FAVORITE',
    exchangeModified:'EXCHANGE_MODIFIED',
    exchangeId:'EXCHANGE_ID',
    // outlookVersion
    viewedDate:'VIEWED_DATE',
    // sorting
    durationPlan:'DURATION_PLAN',
    durationFact:'DURATION_FACT',
    durationType:'DURATION_TYPE',
    descriptionInBbcode:'DESCRIPTION_IN_BBCODE',
    auditors:'AUDITORS',
    accomplices:'ACCOMPLICES',
    // newCommentsCount
    // subStatus
    // creator:'CREATOR',
    // responsible:'RES'


    ufCrmTask:'UF_CRM_TASK',
    ufTaskWebdavFiles: 'UF_TASK_WEBDAV_FILES',
    ufAuto915658270214: 'UF_AUTO_915658270214',
    ufAuto244510721805: 'UF_AUTO_244510721805',
    ufAuto637823431651: 'UF_AUTO_637823431651',
    ufMailMessage:'UF_MAIL_MESSAGE',
    ufAuto226929532613: 'UF_AUTO_226929532613',
    ufAuto187628303463: 'UF_AUTO_187628303463',

    ufAuto251545709641: 'UF_AUTO_251545709641',
    ufAuto274474131393: 'UF_AUTO_274474131393',
    ufAuto280393729397: 'UF_AUTO_280393729397',
    ufAuto616972454340: 'UF_AUTO_616972454340',
    ufAuto645211693582: 'UF_AUTO_645211693582',
    ufAuto719191965958: 'UF_AUTO_719191965958',
    ufAuto851551329931: 'UF_AUTO_851551329931',

    ufColor:'UF_COLOR',
    ufCrmTaskContact:'UF_CRM_TASK_CONTACT',
    ufNextTask:'UF_NEXT_TASK',
    ufPreviewText:'UF_PREVIEW_TEXT',
    ufTaskReport:'UF_TASK_REPORT'
}

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
    status: number = 1
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
    set important(v: boolean){
        const [_, urg] = this.ufAuto851551329931.split(',')
        this.ufAuto851551329931 = v ? 'важная' : 'не важная'
        this.ufAuto851551329931 += ',' + urg
    }

    get important(){
        return !this.ufAuto851551329931.startsWith('не важная')
    }

    set urgent(v: boolean){
        const [imp, _] = this.ufAuto851551329931.split(',')
        this.ufAuto851551329931 = imp + ', '
        this.ufAuto851551329931 += v ? 'важная' : 'не важная'
    }

    get urgent(){
        return !this.ufAuto851551329931.endsWith('не важная')
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

    closePrevDay: boolean = false

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




    static transformToBitrixFields(task:Partial<Task>){
        const result: any = {}

        Object.entries(task).forEach(([k,v]) => {
            if (k in toBxField) {
                // @ts-ignore
                result[toBxField[k]] = v
            }
        })
        return result
    }
}
