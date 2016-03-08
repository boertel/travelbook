import React from 'react'
import Color from 'color'

import store from '../store'


var Point = function (args) {
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
};

Point.prototype.updateFeature = function(color, size) {
    for (var key in this.feature._layers) {
        this.feature._layers[key].setIcon(L.mapbox.marker.icon({
            'marker-color': color,
            'marker-symbol': this.properties.symbol,
            'marker-size': size
        })).setZIndexOffset(1000);
    }
};

Point.prototype.highlight = function() {
    var newColor = new Color(this.properties.color).darken(0.4);
    return this.updateFeature(newColor.hexString(), 'large')
};

Point.prototype.unhighlight = function() {
    return this.updateFeature(this.properties.color, 'small')
};



export default class Marker extends React.Component {
    constructor(props) {
        super(props)
        this.marker = new Point(this.props.marker)
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    componentDidMount() {
        store.push(this.marker)
    }

    componentWillUnmount() {
        store.remove(this.marker)
    }

    onMouseOver() {
        this.marker.highlight();
    }

    onMouseOut() {
        this.marker.unhighlight();
    }

    render() {
        var color = new Color(this.props.marker.color);
        var color = {
            borderColor: this.props.marker.color,
            backgroundColor: color.clearer(0.5).rgbString()
        };

        return (<div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            {this.props.children}
            <div className="dot" style={color}></div>
        </div>)
    }
}
