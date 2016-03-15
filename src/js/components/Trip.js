import React from 'react'
import { connect } from 'react-refetch'

import { Loading, Error, Timeline, Map, Marker } from './'


class Trip extends React.Component {
    render() {
        const { tripFetch, params } = this.props
        if (tripFetch.pending) {
            return <Loading />
        } else if (tripFetch.rejected) {
            return <Error error={tripFetch.reason} />
        } else if (tripFetch.fulfilled) {
            var trip = tripFetch.value,
                page = params.page !==undefined ? trip.pages[parseInt(params.page, 10) - 1] : {}
            var childrenWithProps = React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {trip: trip, page: page})
            })

            var markers = trip.pages.filter((page) => {
                return page.marker;
            }).map((page, i) => {
                page.marker.color = page.color;
                var key = 'marker-' + i;
                var to = '/' + params.name + '/' + params.page;
                return <Marker key={key} marker={page.marker} to={to} />
            });

            return (
                    <div style={{height: '100%'}}>
                        <div className="content">
                            <div className="bar" style={{backgroundColor: page.color}}></div>
                            <Timeline name={params.name} pages={trip.pages} />
                            {childrenWithProps}
                            <Timeline name={params.name} pages={trip.pages} />
                        </div>
                        <Map></Map>
                        { markers }
                    </div>
                   );
        }
    }
}

export default connect(props => ({
    tripFetch: `/data/trips/${props.params.name}/index.json`
}))(Trip)
