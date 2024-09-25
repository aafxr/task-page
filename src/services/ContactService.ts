import {AppContextState} from "../context/AppContext";
import {Task} from "../classes/Task";
import {ErrorService} from "./ErrorService";
import {fetchRestAPI} from "../api";
import {BXPerson} from "../classes/BXPerson";

export class ContactService {
    static getContacts(ctx: AppContextState, task: Task): Promise<BXPerson[]>{
        return new Promise(async (resolve, reject) => {
            try {
                if(!task.hasContact()) return []
                const id = task.getContactId()
                const res = await fetchRestAPI<BXPerson[]>('crm.contact.list', {filter: { ID:id}})

                return res.result.map(p => new BXPerson(p))

            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }
}