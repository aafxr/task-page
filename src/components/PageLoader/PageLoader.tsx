import React from 'react';
import {Loader} from "../Loader";

import './PageLoader.css'

export function PageLoader() {
    return (
        <div className='wrapper'>
            <div className='loader-container'>
                <Loader />
            </div>
        </div>
    )
}

export default PageLoader;