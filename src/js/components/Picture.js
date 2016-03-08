import React from 'react'
import { Link } from 'react-router'

import { Photo, Marker } from './'

export default class Picture extends React.Component {
    render() {
        const { image, widthContainer, ratio, last, margin, color } = this.props;

        var to = this.props.location.pathname + '/' + image.index;

        var width = Math.floor((widthContainer / ratio) * image.aspect_ratio),
                height = Math.floor(widthContainer / ratio),
                style = {
                    position: 'relative',
                    display: 'inline-block',
                    marginRight: (last)  ? 0 : margin + 'px',
                    marginBottom: margin + 'px'
                };

        var photo = (<Photo src={image.src} width={width} height={height} />),
            child = photo,
            marker = image.marker;

        if (marker) {
            marker.color = color;
            child =(<Marker marker={marker}>{photo}</Marker>);
        }

        return (<div className="picture" style={style}>
                    <Link to={to}>{child}</Link>
                </div>);
    }
}
