import React from 'react'
import ReactDOM from 'react-dom'

import { Picture } from './'
import Section from './Section'


class Row extends React.Component {
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

    getRatio() {
        var ratio = this.props.images.reduce((previous, current) => {
            return previous + (current.width / current.height);
        }, 0)
        return ratio;
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.width > 0;
    }

    render() {
        if (this.state.width === 0) {
            return <div></div>;
        }
        const { images, margin, color } = this.props;
        var ratio = this.getRatio()
        var widthContainer = this.state.width - (images.length - 1) * margin;

        var imagesListItem = images.map((image, key) => {
            var last = image === _.last(images);
            return <Picture
                        image={image}
                        color={color}
                        marker={image.marker}
                        key={key}
                        location={this.props.location}
                        widthContainer={widthContainer}
                        last={last}
                        ratio={ratio}
                        margin={margin} />
        });

        return <div className="row">{imagesListItem}</div>;
    }
}

export default Section(Row)
