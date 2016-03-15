import React from 'react'
import { Link } from 'react-router'

import { Photo, Marker } from './'
import Section from './Section'


class Picture extends React.Component {
    render() {
        const { image, widthContainer, ratio, last, margin } = this.props;

        var aspect_ratio = image.width / image.height;

        var width = Math.floor((widthContainer / ratio) * aspect_ratio),
            height = Math.floor(widthContainer / ratio),
            style = {
                position: 'relative',
                display: 'inline-block',
                marginRight: (last)  ? 0 : margin + 'px',
                marginBottom: margin + 'px'
            };

        var photo = (<Photo src={image.src} width={width} height={height} />);

        return (<div className="picture" style={style}>{photo}</div>);
    }
}

export default Section(Picture);
