import React from 'react'
import { connect } from 'react-refetch'

import { Loading, Error, Timeline, Map } from './'


class Trip extends React.Component {
    render() {
        const { tripFetch, params } = this.props
        if (tripFetch.pending) {
            return <Loading />
        } else if (tripFetch.rejected) {
            return <Error error={tripFetch.reason} />
        } else if (tripFetch.fulfilled) {
            var trip = tripFetch.value;
            return (
                    <div>
                        <div className="content">
                            <h1>{trip.title}</h1>
                            <h2>{trip.date}</h2>
                            <div>
                                <Timeline name={params.name} days={trip.days} />
                                {this.props.children}
                                <Timeline name={params.name} days={trip.days} />
                            </div>
                        </div>
                        <Map></Map>
                    </div>
                   );
        }
    }
}

export default connect(props => ({
    tripFetch: `/data/trips/${props.params.name}/index.json`
}))(Trip)
