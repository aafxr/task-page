import {AppContextState} from "../context/AppContext";
import {Task} from "../classes/Task";
import {ErrorService} from "./ErrorService";
import {fetchRestAPI} from "../api";
import {BXPerson} from "../classes/BXPerson";

export class ContactService {
    static getContacts(ctx: AppContextState, task: Task): Promise<BXPerson[]> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!task.hasContact()) return []
                const ids = task.getContactsId()
                let contacts: BXPerson[] = []

                for (const id of ids) {
                    const res = await fetchRestAPI<BXPerson[]>('crm.contact.list', {filter: {ID: id}})
                    contacts = contacts.concat(res.result.map(p => new BXPerson(p)))
                }

                return contacts
            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }
}