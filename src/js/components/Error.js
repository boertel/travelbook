import React from 'react'

export default function Error(props) {
    return (<div className="error">
                <h4>Error</h4>
                <p>{''+ props.error}</p>
            </div>)
}
