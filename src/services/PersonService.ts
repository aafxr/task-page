import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {IBXSuccessResponse} from "../bitrix/@types";
import {fetchUsers} from "../api";
import {BXPerson} from "../classes/BXPerson";

export class PersonService{
    static async byID(ctx: AppContextState, personID: string){

    }

    static getList(ctx: AppContextState){
        (async () => {
            try {

                let request: any = {}
                // загрузка всех задач
                let next = 0
                let res:  IBXSuccessResponse<BXPerson[]>
                let persons: BXPerson[] = []

                do {
                    request.start = next
                    res = await fetchUsers(request)
                    next = res.next
                    persons = persons.concat(res.result.map(p => new BXPerson(p)))
                }while(next < res.total)

                const map = new Map<string, BXPerson>()
                persons.forEach(p => map.set(p.ID, p))
                ctx.updateAppContext(s => ({...s, persons: map}))

            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })()
    }
}