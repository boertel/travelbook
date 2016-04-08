import React from 'react'
import Color from 'color'

import { connect } from 'react-redux'

import store from '../store'


class Point {
    constructor(args) {
        this.properties = args;
        this.feature = L.mapbox.featureLayer({
            // this feature is in the GeoJSON format: see geojson.org
            // for the full specification
            type: 'Feature',
            geometry: {
                type: 'Point',
                // coordinates here are in longitude, latitude order because
                // x, y is the standard for GeoJSON and many formats
                coordinates: this.properties.coordinates
            },
            properties: {
                title: this.properties.title,
                description: this.properties.description,
                // one can customize markers by adding simplestyle properties
                // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
                'marker-size': this.properties.size,
                'marker-color': this.properties.color,
                'marker-symbol': this.properties.symbol
            }
        });
    }

    update(color, size) {
        for (var key in this.feature._layers) {
            this.feature._layers[key].setIcon(L.mapbox.marker.icon({
                'marker-color': color,
                'marker-symbol': this.properties.symbol,
                'marker-size': size
            })).setZIndexOffset(1000);
        }
    }

    highlight() {
        var newColor = new Color(this.properties.color).darken(0.4);
        return this.update(newColor.hexString(), 'large')
    }

    unhighlight() {
        return this.update(this.properties.color, 'small')
    }
}


class Circle {
    constructor(args) {
        this.properties = args;
        var latLng = L.latLng(this.properties.coordinates[1], this.properties.coordinates[0]),
            options = {
                opacity: 1,
                weight: 4,
                fillOpacity: 0.4,
                color: this.properties.color
            };
        this.feature = L.circle(latLng, this.properties.radius, options);
    }

    update(color) {
        this.feature.setStyle({
            color: color
        });
    }

    highlight() {
        var newColor = new Color(this.properties.color).darken(0.4);
        this.update(newColor.hexString());
    }

    unhighlight() {
        this.update(this.properties.color);
    }

}

function addMarker(marker) {
    return {
        'type': 'MARKER_ADD',
        'marker': marker
    }
}

function removeMarker(marker) {
    return {
        'type': 'MARKER_REMOVE',
        'marker': marker
    }
}


class Marker extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.marker.type === 'circle') {
            this.marker = new Circle(this.props.marker);
        } else {
            this.marker = new Point(this.props.marker)
        }
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(addMarker(this.marker));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(removeMarker(this.marker));
    }

    onMouseOver() {
        this.marker.highlight();
    }

    onMouseOut() {
        this.marker.unhighlight();
    }

    render() {
        return (<div className="hasMarker" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            {this.props.children}
        </div>)
    }
}



export default connect()(Marker)
