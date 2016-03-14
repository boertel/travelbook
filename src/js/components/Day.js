import React from 'react'
import Color from 'color'
import { connect } from 'react-refetch'

import { Loading, Error, Title, Text, Row, Viewer, Link, Marker, Style } from './'


function items(blocks) {
    var authorized = ['image'];
    return blocks.filter((block) => authorized.indexOf(block.type) !== -1)
        .map((block) => block.args.images)
        .reduce((next, block, []) => next.concat(block))
}

class Day extends React.Component {
    constructor(props) {
        super(props)
        this.components = {
            'title': Title,
            'text': Text,
            'link': Link,
        }
    }

    getRules() {
        var color = new Color(this.props.day.color),
            borderColor = this.props.day.color,
            backgroundColor = color.clearer(0.5).rgbString();

        return [
            ".text:hover .hasMarker:before { background-color: " + this.props.day.color + " !important; }",
            ".picture .hasMarker:before { border-color: " + borderColor + " !important; background-color: " + backgroundColor + " !important; }"
        ];
    }

    renderBlocks(blocks) {
        var n = 0,
            color = this.props.day.color;
        return blocks.map((block, key) => {
            block.args.key = key;
            switch (block.type) {
                case 'image':
                    var ratio = 0;
                    block.args.images.map(image => {
                        image.aspect_ratio = image.width / image.height
                        image.index = n
                        n += 1
                        ratio += image.aspect_ratio
                    })
                    return <Row {...block.args} location={this.props.location} ratio={ratio} margin={10} color={color} />
                default:
                    var component = this.components[block.type]
                    if (component !== undefined) {
                        var child = React.createElement(component, block.args);
                        if (block.marker) {
                            block.marker.color = color;
                            child = <Marker key={key} marker={block.marker}>{child}</Marker>
                        }
                        return <div key={key} className={block.type}>{child}</div>;
                    } else {
                        console.log('Unsupported type: ' + block.type)
                    }
            }
        })
    }

    render() {
        const { dayFetch, params, trip, day } = this.props

        if (dayFetch.pending) {
            return <Loading />
        } else if (dayFetch.rejected) {
            console.log(dayFetch);
            return <Error error={dayFetch.reason} />
        } else if (dayFetch.fulfilled) {
            const { blocks } = dayFetch.value
            let media = undefined
            let viewer = null
            if (params.index !== undefined) {
                const index = parseInt(params.index, 10)
                media = items(blocks)
                viewer = <div className="viewer"><Viewer media={media} index={index} back={this.props.location.pathname} /></div>
            }

            return (
                    <div className="components">
                        <Style rules={this.getRules()}></Style>
                        <div className="boxes">{this.renderBlocks(blocks)}</div>
                        {viewer}
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
