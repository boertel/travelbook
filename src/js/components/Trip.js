import React from 'react'

import { Loading, Error, Timeline, Map } from './'
import { asynchronous } from '../asynchronous'


class Trip extends React.Component {
    render() {
        const { params } = this.props;
        const { data, isPending, isFulfilled } = this.props.trip;
        if (isPending) {
            return <Loading />
        } else if (isFulfilled) {
            var trip = data,
                color = params.day !==undefined ? trip.days[parseInt(params.day, 10) - 1].color : {}
            var childrenWithProps = React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {trip: trip})
            })
            return (
                    <div style={{height: '100%'}}>
                        <div className="content">
                            <div className="bar" style={{backgroundColor: color}}></div>
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

export default asynchronous({
    key: 'trip',
    url:  (props) => (`/data/trips/${props.params.name}/index.json`)
})(Trip);
