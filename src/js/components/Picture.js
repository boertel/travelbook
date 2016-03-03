import React from 'react'

export default function Picture(props) {
    var dot = props.marker ? <div className="dot"></div> : null
    return (
            <div>
                <img src={'http://travelbook.oertel.fr/' + props.src} width={props.width} height={props.height} />
                {dot}
            </div>
            )
}
