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
            var childrenWithProps = React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {trip: trip})
            })
            return (
                    <div style={{height: '100%'}}>
                        <div className="content">
                            <Timeline name={params.name} days={trip.days} />
                            {childrenWithProps}
                            <Timeline name={params.name} days={trip.days} />
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
