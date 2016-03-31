import React from 'react'
import _ from 'lodash'

import { Title, Text, Row, Link, Marker, Picture } from './'


export default class Section extends React.Component {
	constructor(props) {
		super(props);

        this.components = {
            'title': Title,
            'text': Text,
            'link': Link,
            'images': Row,
            'image': Picture,
            'marker': Marker,
            'root': 'div'
        }
	}


	render() {
        var { type, args, children } = this.props;
        var component = this.components[type];

        children = children || [];

        if (component !== undefined) {
            var children = children.map((child, key) => {
                return <Section {...child} pathname={this.props.pathname} key={key} />;
            });

            var section = children;
            if (args !== undefined) {
                args.pathname = this.props.pathname;
                if (children.length === 0) {
                    _.merge(args, args.inheritance);
                }
                section = React.createElement(component, {...args}, children);
            }

            var className = 'section ' + (type);
            return (<div className={className}>{section}</div>);
        } else {
            console.log('Unsupported type: ' + type)
            return null;
        }
    }

}

Section.propTypes = {
    type: React.PropTypes.string,
    args: React.PropTypes.object,
    children: React.PropTypes.array,
    // TODO remove, it's a pain to get to Wrap component
    pathname: React.PropTypes.string,
};
