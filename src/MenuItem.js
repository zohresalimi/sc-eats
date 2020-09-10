import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MenuItem = (props) =>{
    const [showChildren, setShowChildren]= useState(false)
    return (
        <span className="button-group">
            <button onClick={() => setShowChildren(!showChildren)}><span>{props.title}</span> <FontAwesomeIcon icon={"chevron-down"} /></button>
            {showChildren && props.children}
        </span>
    )
}

export default MenuItem