import React from 'react'


function buildFlickrUrl(photo, size, extension) {
    extension = extension || 'jpg';
    var base = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
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
        this.state = {
            size: threshold(props.width, props.height)
        };
    }

    render() {
        var url;
        if (typeof this.props.src === 'string') {
            url = this.props.src;
        } else {
            if (this.props.src.type === 'flickr') {
                url = buildFlickrUrl(this.props.src, this.state.size);
            }
        }

        return <img src={url} width={this.props.width} height={this.props.height} />
    }
}
