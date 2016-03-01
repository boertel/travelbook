import React from 'react'

export default function Picture(props) {
    return (<img src={'http://travelbook.oertel.fr/' + props.src} width={props.width} height={props.height} />)
}
