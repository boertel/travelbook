import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router'

import store from '../store'
import history from '../history'


export default function (Component) {
    class Wrap extends React.Component {
        constructor(props) {
            super(props);
            this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            this.state = {
                index: -1
            }
        }

        componentDidMount() {
            if (this.props.src) {
                store.sections.push(this.props);
                this.setState({ index: store.sections.get().length - 1});
            }
        }

        render() {
            var props = this.props,
                child = <Component {...props} />;

            if (props.src) {
                var index = this.state.index;
                var to = this.props.pathname + '/' + index;
                child = <Link to={to}>{child}</Link>;
            }

            return child;
        }
    }

    return Wrap
}
