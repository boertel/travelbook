import React from 'react'
import Color from 'color'
import { connect } from 'react-refetch'

import store from '../store'
import history from '../history'
import { Loading, Error, Style, Section, Viewer } from './'


class Page extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    getRules() {
        var color = new Color(this.props.page.color),
            borderColor = this.props.page.color,
            backgroundColor = color.clearer(0.5).rgbString();

        return [
            ".marker .text:hover:before, .marker .title:hover:before { background-color: " + this.props.page.color + " !important; }",
            ".marker .picture:hover:before { border-color: " + borderColor + " !important; background-color: " + backgroundColor + " !important; }"
        ];
    }


    render() {
        const { pageFetch, params, trip, page } = this.props

        if (pageFetch.pending) {
            return <Loading />
        } else if (pageFetch.rejected) {
            return <Error error={pageFetch.reason} />
        } else if (pageFetch.fulfilled) {
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

            history.pathname = this.props.location.pathname;

            return (
                    <div className="sections">
                        <Style rules={this.getRules()}></Style>
                        <Section {...pageFetch.value} pathname={this.props.location.pathname} />
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
