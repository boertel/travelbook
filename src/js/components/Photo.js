import React from 'react'
import _ from 'lodash'

var cache = {};

function buildFlickrUrl(photo, size) {
    var extension = photo.extension || 'jpg';
    var base = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (extension === 'gif') {
        size = 'o_d';
    }
    if (size !== undefined) {
        base += '_' + size;
    }
    return base + '.' + extension;
}

function threshold(width, height) {
    var limits = [
        { ext: 't', pixels: 100 },
        { ext: 'm', pixels: 240 },
        { ext: 'n', pixels: 320 },
        { ext: undefined, pixels: 500 },
        { ext: 'z', pixels: 640 },
        { ext: 'c', pixels: 800 },
        { ext: 'b', pixels: 1024 },
        { ext: 'h', pixels: 1600 },
        { ext: 'k', pixels: 2048 },
    ]
    var max = Math.max(width, height),
        i = 0;

    while (i > limits.length - 1 || max >= limits[i].pixels) {
        i += 1;
    }
    return limits[i].ext;
}


export default class Photo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps.src, this.props.src) || nextProps.width !== this.props.width || nextProps.height !== this.props.height;
    }

    getOptimizedUrl(size) {
        if (typeof this.props.src === 'string') {
            return this.props.src;
        } else if (this.props.src.type === 'flickr') {
            var state = this.state || {}
            size = size || state.size;
            return buildFlickrUrl(this.props.src, size);
        }
    }

    getSize() {
        return threshold(this.props.width, this.props.height);
    }

    render() {
        var url = this.getOptimizedUrl(this.getSize());
        return <img src={url}
                    width={this.props.width}
                    height={this.props.height} />
    }
}
