import React, {useEffect, useState} from 'react';
import clsx from "clsx";


import './NetStat.css'


export function NetStat() {
    const [s, setS] = useState<'online' | 'offline' | undefined>()


    useEffect(() => {

        const onOnline = () => {
            setS('online')
            setTimeout( () => setS(p => p === 'online' ? undefined : p), 500)
        }

        const onOffline = () => setS('offline')

        window.addEventListener('online', onOnline)
        window.addEventListener('offline', onOffline)
        return () => {
            window.removeEventListener('online', onOnline)
            window.removeEventListener('offline', onOffline)
        }
    }, []);


    return (
        <div className={clsx('netstat', s)}>{s}</div>
    );
}

