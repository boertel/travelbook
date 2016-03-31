import React from 'react'
import { Link } from 'react-router'

import { Photo, Marker } from './'
import Wrap from './Wrap'


class Picture extends React.Component {
    render() {
        const { ratio, widthContainer, last, margin, src } = this.props;
        let { width, height } = this.props;

        var aspect_ratio = width / height;

        width = Math.floor((widthContainer / ratio) * aspect_ratio);
        height = Math.floor(widthContainer / ratio);
        const style = {
            position: 'relative',
            display: 'inline-block',
            marginRight: (last)  ? 0 : margin + 'px',
            marginBottom: margin + 'px'
        };

        const photo = (<Photo src={src} width={width} height={height} />);

        return (<div className="picture" style={style}>{photo}</div>);
    }
}

export default Wrap(Picture);
