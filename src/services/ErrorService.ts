import {AppContextState} from "../context/AppContext";
import {errors} from "../errors";

/**
 * преобразует сообщение  об ошибке в читаемое сообщение
 * @param errorMessage
 */
function errorMessageToReadableMessage(errorMessage: string): string {

    switch (errorMessage) {
        case errors.BX_EXPIRED_TOKEN:
        case errors.UNAUTHORIZED:
            return 'Необходимо авторизоваться в срм'
        case errors.BX_PAYMENT_REQUIRED:
            return 'Приложение временно не достсупно'
        case errors.BX_INSUFFICIENT_SCOPE:
            return 'Недостаточно прав'
        default:
            return errorMessage
    }
}


export class ErrorService {
    static handleError(ctx: AppContextState) {
        return (e: Error) => {
            // handle error here ...
            ctx.updateAppContext(s => ({...s, error: new Error(errorMessageToReadableMessage(e.message))}))
            console.error('[ErrorService] ', e)
        }
    }
}