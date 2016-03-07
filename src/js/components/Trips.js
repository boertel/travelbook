import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-refetch'

import { Loading } from '.'


class Trips extends React.Component {
    render() {
        const { tripsFetch } = this.props;
        if (tripsFetch.pending) {
            return <Loading />
        } else if (tripsFetch.fulfilled) {
            var trips = tripsFetch.value.map(function(trip, key) {
                var to = '/'  + trip.id + '/1';
                return (<li key={key}><Link to={to}>{trip.title}</Link></li>);
            });
            return <ul>{trips}</ul>
        }

    }
}

export default connect(props => ({
    tripsFetch: { url: '/data/trips/index.json' }
}))(Trips)

