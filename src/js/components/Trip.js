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
            var trip = tripFetch.value,
                day = params.day !==undefined ? trip.days[params.day] : {}
            var childrenWithProps = React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {trip: trip, day: day})
            })
            return (
                    <div style={{height: '100%'}}>
                        <div className="content">
                            <div className="bar" style={{backgroundColor: day.color}}></div>
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
