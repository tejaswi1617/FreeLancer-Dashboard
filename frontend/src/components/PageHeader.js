/* Author: Vishal Sancheti */

import React from 'react';
import "../styles/PageHeader.scss"
const PageHeader =(props) =>{
    return(
        <>
            <div className="page-header-title">{props.title}</div>
            <div className="page-header-subtitle">{props.subtitle}</div>
        </>
    )
}

export default PageHeader;