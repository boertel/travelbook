import React from 'react'

import Wrap from './Wrap'


function Text(props) {
    return (<div className="text">
                <p>{props.text}</p>
            </div>)
}

export default Wrap(Text);
