import {TaskPerson} from "./TaskPerson";

export class Task {
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
    closedBy: any | null = null
    closedDate: Date | null = null
    dateStart: Date | null = null
    deadline: Date | null = null
    startDatePlan: Date | null = null
    endDatePlan: Date | null = null
    guid: string = ''
    xmlId: any | null = null
    commentsCount: any | null = null
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
    sorting: string = ''
    durationPlan: string = ''
    durationFact: any | null = null
    durationType: string = ''
    descriptionInBbcode: string = ''
    ufCrmTask: Array<any> = []
    ufTaskWebdavFiles: number[] = []
    ufAuto915658270214: any | null = null
    ufAuto244510721805: any | null = null
    ufAuto637823431651: string = ''
    ufMailMessage: any | null = null
    ufAuto226929532613: string = ''
    ufAuto187628303463: any | null = null
    auditors: Array<any> = []
    accomplices: Array<any> = []
    newCommentsCount: number = -1
    subStatus: string = ''
    creator: TaskPerson | null = null
    responsible: TaskPerson | null = null

    constructor(t: Partial<Task> = {}) {
        Object.keys(t)
            .forEach(k => {
                if (k in this) {
                    if (k.startsWith('date') || k.includes('Date') || k === 'deadline'){
                        //@ts-ignore
                        this[k] = new Date(t[k])
                        return
                    }
                    //@ts-ignore
                    this[k] = t[k]
                }
            })
    }
}