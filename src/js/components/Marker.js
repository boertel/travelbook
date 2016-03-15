import React from 'react'
import Color from 'color'

import history from '../history'
import store from '../store'

class MapComponent {
    constructor(args, to) {
        this.properties = args;
        this.to = to;

        this.feature = this.createFeature();
        this.bind();
    }

    bind() {
        this.onclick && this.feature.addEventListener('click', this.onclick.bind(this));
        this.onmouseover && this.feature.addEventListener('mouseover', this.onmouseover.bind(this));
        this.onmouseout && this.feature.addEventListener('mouseout', this.onmouseout.bind(this));
    }

    onclick() {
        if (this.to !== undefined) {
            history.push(this.to)
        }
    }

    onmouseover() {
        this.highlight();
    }

    onmouseout() {
        this.unhighlight();
    }

    highlightedColor() {
        return new Color(this.properties.color).darken(0.4);
    }

}


class Point extends MapComponent {
    createFeature() {
        return L.mapbox.featureLayer({
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
        return this.update(this.highlightedColor().hexString(), 'large')
    }

    unhighlight() {
        return this.update(this.properties.color, 'small')
    }
}


class Circle extends MapComponent {
    createFeature() {
        var latLng = L.latLng(this.properties.coordinates[1], this.properties.coordinates[0]),
            options = {
                opacity: 1,
                weight: 4,
                fillOpacity: 0.4,
                color: this.properties.color
            };
        return L.circle(latLng, this.properties.radius, options);
    }

    update(color) {
        this.feature.setStyle({
            color: color
        });
    }

    highlight() {
        this.update(this.highlightedColor().hexString());
    }

    unhighlight() {
        this.update(this.properties.color);
    }

}



export default class Marker extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.marker.type === 'circle') {
            this.marker = new Circle(this.props.marker, this.props.to);
        } else {
            this.marker = new Point(this.props.marker, this.props.to)
        }
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

    onClick() {
        this.marker.onclick();
    }

    render() {
        return (<div className="marker" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            {this.props.children}
        </div>)
    }
}
