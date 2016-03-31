import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import { Picture } from './'
import Wrap from './Wrap'


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
        var ratio = this.props.children.reduce((previous, child) => {
            var current = child.props.args,
                children = child.props.children || [];

            if (children.length > 0) {
                // FIXME, deep lookup
                current = children[0].args;
            }

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

        const margin = 10,
            widthContainer = this.state.width - (this.props.children.length - 1) * margin;

        var inheritance = {
            widthContainer: widthContainer,
            ratio: this.getRatio(),
            pathname: this.props.pathname,
            margin: margin
        };

        var childrenWithProps = React.Children.map(this.props.children, (child, i) => {
            inheritance.last = (i === this.props.children.length - 1);
            _.merge(child.props.args, {inheritance: inheritance});
            return React.cloneElement(child, child.props);
        })

        return <div className="row">{childrenWithProps}</div>
    }
}

export default (Row)
