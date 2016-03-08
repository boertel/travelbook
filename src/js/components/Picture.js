import React from 'react'

import { Photo, Marker } from './'

export default class Picture extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        var child = (
                <Photo {...this.props} />
            )

        if (this.props.marker) {
            // dot = <div className="dot" style={color}></div>;
            return (
                <Marker marker={this.props.marker}>
                    {child}
                </Marker>
               )
        }
        return (<div className="picture">{child}</div>);
    }
}
