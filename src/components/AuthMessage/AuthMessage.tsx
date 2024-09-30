import React from 'react';
import {BASE_URL} from "../../App";

const HOST = process.env.REACT_APP_HOST_NAME

export function AuthMessage() {
    return (
        <span>
            необходимо <a href={`https://${HOST}/auth/?backurl=${BASE_URL}`}>авторизоваться</a>
        </span>
    );
}

