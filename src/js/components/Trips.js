import React from 'react'
import { Link } from 'react-router'
import { connect, Provider } from 'react-redux'

import { Loading } from '.'
import { asynchronous } from '../asynchronous'



class Trips extends React.Component {
    render() {
        const { data, isFulfilled, isPending } = this.props.trips;

        if (isPending) {
            return <Loading />
        } else if (isFulfilled) {
            var items = data.map(function(trip, key) {
                var to = '/'  + trip.id + '/1';
                return (<li key={key}><Link to={to}>{trip.title}</Link></li>);
            });
            return <ul>{items}</ul>
        }
    }
}



export default asynchronous({
    url: '/data/trips/index.json',
    key: 'trips'
})(Trips)
