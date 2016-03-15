import React from 'react'

import Section from './Section'


function Title(props) {
    return (
            <div>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
           )
}

export default Section(Title)
