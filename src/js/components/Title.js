import React from 'react'

import Wrap from './Wrap'


function Title(props) {
    return (
            <div className="title">
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
           )
}

export default Wrap(Title)
