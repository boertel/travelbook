import React from 'react'
import { connect } from 'react-refetch'

import { Loading, Error, Title, Text, Row, Viewer, Marker } from './'


function getMarkers(blocks) {
    var authorized = ['image'];
    return blocks.filter((block) => authorized.indexOf(block.type) !== -1)
        .map((block) => block.args.images)
        .reduce((next, block, []) => next.concat(block))
        .map((image) => image.marker)
        .filter((marker) => marker !== undefined)
}

function items(blocks) {
    var authorized = ['image'];
    return blocks.filter((block) => authorized.indexOf(block.type) !== -1)
        .map((block) => block.args.images)
        .reduce((next, block, []) => next.concat(block))
}

class Day extends React.Component {
    renderBlocks(blocks) {
        var n = 0;
        return blocks.map((block, i) => {
            block.args.key = i;
            switch (block.type) {
                case 'title':
                    return <Title {...block.args} />
                case 'text':
                    return <Text {...block.args} />
                case 'image':
                    var ratio = 0;
                    block.args.images.map(image => {
                        image.aspect_ratio = image.width / image.height
                        image.index = n
                        n += 1
                        ratio += image.aspect_ratio
                    })
                    return <Row {...block.args} location={this.props.location} ratio={ratio} margin={10} />
            }
        })
    }

    render() {
        const { dayFetch, params } = this.props

        if (dayFetch.pending) {
            return <Loading />
        } else if (dayFetch.rejected) {
            console.log(dayFetch);
            return <Error error={dayFetch.reason} />
        } else if (dayFetch.fulfilled) {
            const { blocks, color } = dayFetch.value
            let media = undefined
            let viewer = null
            if (params.index !== undefined) {
                const index = parseInt(params.index, 10)
                media = items(blocks)
                viewer = <div className="viewer"><Viewer media={media} index={index} back={this.props.location.pathname} /></div>
            }

            var markers = getMarkers(blocks).map((marker, key) => {
                return <Marker marker={marker} key={key} />
            })
            return (
                    <div>
                        <div className="boxes">{this.renderBlocks(blocks)}</div>
                        {viewer}
                        {markers}
                    </div>
                   )
        }
    }
}

export default connect(props => ({
    dayFetch: {
        url: `/data/trips/${props.params.name}/${props.params.day}.json`
    }
}))(Day)
