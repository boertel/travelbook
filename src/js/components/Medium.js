import React from 'react'


export default class Medium extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getSize()
        this.resize = this.resize.bind(this)
    }

    getSize() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
    }

    resize() {
        this.setState(this.getSize())
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.width !== 0 && nextState.height !== 0;
    }

    render() {
        var current = this.props;

        var ratio = {
                width: 0.7,
                height: 0.8
            },
            imgRatio = current.width / current.height,
            width = parseInt(this.state.windowWidth * ratio.width),
            height = parseInt(width / imgRatio);

        if (height > this.state.windowHeight * ratio.height) {
            height = this.state.windowHeight * ratio.height;
            width = height * imgRatio;
        }

        var figureStyle = {
            width: width + 'px',
            height: height + 'px',
            left: parseInt((this.state.windowWidth - width) / 2) + 'px',
            top: parseInt((this.state.windowHeight - height) / 2) + 'px'
        };

        var figcaptionStyle = {};
        if (this.state.windowWidth >= 1220) {
            figcaptionStyle = {
                left: width + 'px',
                bottom: 0,
                paddingLeft: '20px'
            };
        }

        return (
                <div className="media-viewer-wrapper">
                    <div className="media-viewer-asset" style={figureStyle}>
                        <img src={'http://travelbook.oertel.fr/' + current.src} />
                        <nav className="image-navigation previous">
                            <span className="visually-hidden">Go to previous image</span>
                        </nav>
                        <nav className="image-navigation next">
                            <span className="visually-hidden">Go to next image</span>
                        </nav>
                        <figcaption className="caption" style={figcaptionStyle}>
                            <span className="caption-text">{current.caption}</span>
                            <span className="credit">{current.credit}</span>
                        </figcaption>
                    </div>
                </div>
               );
    }
}
