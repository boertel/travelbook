import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import { Picture } from './'


export default class Row extends React.Component {
    constructor(props) {
        super(props)
        this.resize = this.resize.bind(this)
        this.state = {
            width: 0
        }
    }
    resize() {
        this.setState({
            width: ReactDOM.findDOMNode(this).offsetWidth
        });
    }
    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    render() {
        const { images, ratio, margin } = this.props
        var widthContainer = this.state.width - (images.length - 1) * margin,
            last = images[images.length - 1];

        var imagesListItem = images.map((image, key) => {
            var width = Math.floor((widthContainer / ratio) * image.aspect_ratio),
                height = Math.floor(widthContainer / ratio),
                style = {
                    display: 'inline-block',
                    marginRight: (image === last)  ? 0 : margin + 'px',
                    marginBottom: margin + 'px'
                };
            var to = this.props.location.pathname + '/' + image.index;
            return (
                <div className="picture" style={style} key={key}>
                    <Link to={to}>
                        <Picture
                            margin={margin}
                            src={image.src}
                            width={width}
                            height={height}
                        />
                    </Link>
                </div>
            );
        });

        return <div className="row">{imagesListItem}</div>;
    }
}
