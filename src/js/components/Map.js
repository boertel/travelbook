import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'


class Map extends React.Component {
    constructor(props) {
        super(props)

        this.map = undefined
        this.group = undefined
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {

        var options = {
            zoomControl: false
        };


        var node = ReactDOM.findDOMNode(this)

        if (this.map === undefined) {
            this.map = L.mapbox.map(node, 'mapbox.streets', options);
            new L.Control.Zoom({ position: 'topright' }).addTo(this.map);
        }

        if (this.group !== undefined) {
            this.group.clearLayers();
        }

        var features = this.props.markers.map((marker) => marker.feature);

        if (features.length > 0) {
            this.group = L.featureGroup(features).addTo(this.map)
            this.map.fitBounds(this.group.getBounds(), { maxZoom: 14, paddingTopLeft: [950, 0] })
        }
    }

    render() {
        return <div className="map"/>
    }
}


function mapStateToProps(state) {
    return {
        'markers': state.markersState.markers
    }
}

export default connect(mapStateToProps)(Map);
