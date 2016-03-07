import React from 'react'

// TODO why './' isn't working?
import Marker from './Marker'


export default class Picture extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        var child = (
                <img src={'http://travelbook.oertel.fr/' + this.props.src} width={this.props.width} height={this.props.height} />
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
