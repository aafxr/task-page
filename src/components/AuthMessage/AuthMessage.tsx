import React from 'react';


export function AuthMessage() {


    function handleIdClick(){
        if(Telegram.WebApp.initDataUnsafe.user){
            navigator.clipboard.writeText('' + Telegram.WebApp.initDataUnsafe.user.id )
                .then(() => Telegram.WebApp.showAlert('Ваше id скопировано в буфер обмена'))
        }
    }


    return (
        <span>
            Сообщите руководителю ваш телеграм id (<span onClick={handleIdClick}>{Telegram.WebApp.initDataUnsafe.user?.id}</span>),
            чтобы вас добавили в систему
        </span>
    );
}

