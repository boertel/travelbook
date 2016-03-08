import React from 'react'
import ReactDOM from 'react-dom'

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
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.width > 0;
    }
    render() {
        if (this.state.width === 0) {
            return <div></div>;
        }
        const { images, ratio, margin, color } = this.props;
        var widthContainer = this.state.width - (images.length - 1) * margin;

        var imagesListItem = images.map((image, key) => {
            var last = image === _.last(images);
            return <Picture
                        image={image}
                        key={key}
                        location={this.props.location}
                        widthContainer={widthContainer}
                        last={last}
                        ratio={ratio}
                        color={color}
                        margin={margin} />
        });

        return <div className="row">{imagesListItem}</div>;
    }
}
