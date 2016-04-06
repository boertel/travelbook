import React from 'react'

import { Title, Text, Row, Viewer, Link, Marker } from './'

export default class Section extends React.Component {
    constructor(props) {
        super(props);
        this.components = {
            'title': Title,
            'text': Text,
            'link': Link,
        }
    }

    render() {
        const { type, args, marker, location, key, color } = this.props;
        switch (type) {
            case 'image':
                return <Row {...args} location={location} margin={10} color={color} />
            default:
                var component = this.components[type];
                if (component !== undefined) {
                    var child = React.createElement(component, args);
                    if (marker) {
                        marker.color = color;
                        child = <Marker key={key} marker={marker}>{child}</Marker>
                    }
                    return <div key={key} className={type}>{child}</div>;
                } else {
                    console.log('Unsupported type: ' + type)
                }

        }
        return null;
    }
};
