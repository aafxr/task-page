const d = new Date()
d.setHours(23, 59,59,999)

export class NextTask{
    deadLine: Date = new Date(d)
    description: string = ''
    contact: string = ''
    user: string = ''
    important: boolean = false
    urgent: boolean = false

    constructor(nt: Partial<NextTask> = {}) {
        for (const k of Object.keys(nt)){
            //@ts-ignore
            this[k] = nt[k]
        }
    }
}