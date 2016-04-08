import React from 'react'
import _ from 'lodash'


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

        var size = threshold(props.width, props.height);
        this.state = {
            loaded: false,
            size: size
        };
    }

    getUrl(props) {
        props = props || this.props;
        var url;
        if (typeof props.src === 'string') {
            url = props.src;
        } else {
            if (props.src.type === 'flickr') {
                url = buildFlickrUrl(props.src, this.state.size);
            }
        }
        return url;
    }

    loadImage() {
        this.setState({
            loaded: false
        });
        var image = new Image();
        image.onload = () => {
                this.setState({
                    loaded: true
                });
        };
        image.src = this.getUrl();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.loaded !== nextState.loaded;
    }

    componentDidMount() {
        this.loadImage();
    }

    componentWillReceiveProps(nextProps) {
        if (this.getUrl(nextProps) !== this.getUrl()) {
            this.loadImage();
        }
    }

    render() {
        if (this.state.loaded) {
            return <img src={this.getUrl()} width={this.props.width} height={this.props.height} />
        } else {
            return <span></span>;
        }
    }
}
