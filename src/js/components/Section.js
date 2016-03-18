import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router'

import { Marker, Picture } from './'


export default function (Component) {
    class Section extends React.Component {
        constructor(props) {
            super(props);
            this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        }

        render() {
            var props = this.props,
                child = <Component {...props} />;

            if (props.marker !== undefined) {
                var marker = props.marker;
                marker.color = this.props.color;
                child = <Marker marker={props.marker}>{child}</Marker>;
            }

            if (props.to !== undefined) {
                var to = props.to;
                child = <Link to={to}>{child}</Link>;
            }

            return (<div className="section">{child}</div>);
        }
    }

    Section.propTypes = {
        marker: React.PropTypes.object,
        color: React.PropTypes.string
    };

    return Section
}
