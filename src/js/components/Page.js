import React from 'react'
import Color from 'color'
import { connect } from 'react-refetch'

import store from '../store'
import { Loading, Error, Title, Text, Row, Viewer, Link, Marker, Style } from './'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.components = {
            'title': Title,
            'text': Text,
            'link': Link,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageFetch.fulfilled) {
            store.sections.clean();
            var media = nextProps.pageFetch.value.blocks
                .filter((section) => {
                    return section.type === 'image';
                }).map((section) => {
                    return section.args.images;
                }).reduce((previous, current) => {
                    return previous.concat(current);
                }, [])

            var index = 0;
            media.forEach((medium) => {
                medium.index = index + 1;
            });
            store.sections.push(media);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
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
        var color = this.props.page.color;
        return blocks.map((block, key) => {
            block.args.color = color;
            block.args.key = key;
            switch (block.type) {
                case 'image':
                    return <Row {...block.args} location={this.props.location} />
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
            let viewer = null
            if (params.index !== undefined) {
                viewer = (<div className="viewer">
                            <Viewer
                                media={store.sections.get()}
                                params={this.props.params}
                                pathname={this.props.location.pathname}
                            />
                        </div>);
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
