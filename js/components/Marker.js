import React from 'react'

import store from '../store'


export default class Marker extends React.Component {
    componentDidMount() {
        store.push(this.props.marker)
    }

    componentWillUnmount() {
        store.remove(this.props.marker)
    }

    render() {
        return null
    }
}
