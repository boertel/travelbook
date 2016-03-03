import React from 'react'
import { connect } from 'react-refetch'

import { Loading } from '.'


class Trips extends React.Component {
    render() {
        const { tripsFetch } = this.props;
        if (tripsFetch.pending) {
            return <Loading />
        } else if (tripsFetch.fulfilled) {
            return <div></div>
        }

    }
}

export default connect(props => ({
    tripsFetch: { url: '/data/trips/index.json' }
}))(Trips)

