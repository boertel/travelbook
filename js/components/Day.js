import React from 'react'
import { connect } from 'react-refetch'

import { Loading, Error, Title, Text, Row } from './'


class Day extends React.Component {
    renderBlocks(blocks) {
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
                        ratio += image.aspect_ratio
                    })
                    block.args.ratio = ratio;
                    return <Row {...block.args} ratio={ratio} margin={10} />
            }
        })
    }

    render() {
        const { dayFetch } = this.props
        if (dayFetch.pending) {
            return <Loading />
        } else if (dayFetch.rejected) {
            console.log(dayFetch);
            return <Error error={dayFetch.reason} />
        } else if (dayFetch.fulfilled) {
            return <div>{this.renderBlocks(dayFetch.value.blocks)}</div>
        }
    }
}

export default connect(props => ({
    dayFetch: {
        url: `/data/trips/${props.params.name}/${props.params.day}.json`
    }
}))(Day)
