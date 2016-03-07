import React from 'react'
import ReactDOM from 'react-dom'

import store from '../store'




export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: []
        }

        this.onchange = this.onchange.bind(this)
        this.map = undefined
        this.group = undefined
    }

    onchange() {
        this.setState({
            markers: store.get()
        })
    }

    componentDidMount() {
        store.bind(this.onchange);
    }

    componentWillUnmount() {
        store.unbind(this.onchange)
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

        var markers = this.state.markers.map((marker) => {
            return marker
        })

        var features = markers.map((marker) => marker.feature)
        this.group = L.featureGroup(features).addTo(this.map)
        this.map.fitBounds(this.group.getBounds(), { maxZoom: 14, paddingTopLeft: [950, 0] })
    }

    render() {
        var style = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%'
        }
        return <div style={style}/>
    }
}
