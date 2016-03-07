import React from 'react'
import hexRgb from 'hex-rgb'

import store from '../store'


function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;

    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


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
    var newColor = LightenDarkenColor(this.properties.color, -40);
    return this.updateFeature(newColor, 'large')
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
        var rgb = hexRgb(this.props.marker.color);
        var fadedColor = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 0.5)';
        var color = {
            borderColor: this.props.marker.color,
            backgroundColor: fadedColor
        };

        return (<div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            {this.props.children}
            <div className="dot" style={color}></div>
        </div>)
    }
}
