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

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.components = {
            'title': Title,
            'text': Text,
            'link': Link,
        }
    }

    getRules() {
        var color = new Color(this.props.page.color),
            borderColor = this.props.page.color,
            backgroundColor = color.clearer(0.5).rgbString();

        return [
            ".section:hover .marker:before { background-color: " + this.props.page.color + " !important; }",
            ".picture .marker:before { border-color: " + borderColor + " !important; background-color: " + backgroundColor + " !important; }"
        ];
    }

    renderBlocks(blocks) {
        var n = 0,
            color = this.props.page.color;
        return blocks.map((block, key) => {
            block.args.color = color;
            block.args.key = key;
            switch (block.type) {
                case 'image':
                    block.args.images.map(image => {
                        image.index = n
                        n += 1
                    })
                    return <Row {...block.args} location={this.props.location} margin={10} />
                default:
                    var component = this.components[block.type]
                    if (component !== undefined) {
                        var child = React.createElement(component, {...block.args});
                        return <div key={key} className={block.type}>{child}</div>;
                    } else {
                        console.log('Unsupported type: ' + block.type)
                    }
            }
        })
    }

    render() {
        const { pageFetch, params, trip, page } = this.props

        if (pageFetch.pending) {
            return <Loading />
        } else if (pageFetch.rejected) {
            return <Error error={pageFetch.reason} />
        } else if (pageFetch.fulfilled) {
            const { blocks } = pageFetch.value
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
    pageFetch: {
        url: `/data/trips/${props.params.name}/${props.params.page}.json`
    }
}))(Page)
