import React from 'react'
import Color from 'color'

import asynchronous from '../asynchronous'
import { Loading, Error, Style, Viewer, Section } from './'



class Day extends React.Component {
    constructor(props) {
        super(props)
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

    renderSections(sections, markers) {
        var color = this.props.day.color;
        return sections.map((section, key) => {
            var marker = section.args.marker !== undefined ? markers[section.args.marker] : undefined;
            return <Section {...section} marker={marker} key={key} color={color} location={this.props.location} />;
        })
    }

    render() {
        const { dayFetch, params, trip, day } = this.props;

        if (dayFetch.pending) {
            return <Loading />
        } else if (dayFetch.rejected) {
            return <Error error={dayFetch.reason} />
        } else if (dayFetch.fulfilled) {
            const { sections, media, markers } = dayFetch.value;
            let viewer = null
            if (params.index !== undefined) {
                const index = parseInt(params.index, 10)
                viewer = <div className="viewer"><Viewer media={media} index={index} back={this.props.location.pathname} /></div>
            }

            return (
                    <div className="components">
                        <Style rules={this.getRules()}></Style>
                        <div className="boxes">{this.renderSections(sections, markers)}</div>
                        {viewer}
                    </div>
                   )
        }k
    }
}


function items(sections) {
    var authorized = ['image'];
    var n = 0;
    return sections.filter((section) => authorized.indexOf(section.type) !== -1)
        .map((section) => {
            section.args.images.forEach((image) => {
                image.index = n;
                n += 1;
            })
            return section.args.images;
        })
        .reduce((next, section, []) => next.concat(section))
}

function transform(data) {
    data.media = items(data.sections);

    data.sections.filter((section) => section.type === 'image')
        .map((section) => {
            var ratio = 0;
            section.args.images.map(image => {
                image.aspect_ratio = image.width / image.height;
                if (image.marker !== undefined) {
                    image.marker = data.markers[image.marker];
                }
                ratio += image.aspect_ratio;
            })
            section.args.ratio = ratio;
        });
    console.log(data)
    return data;
}

export default asynchronous(transform)(props => ({
    dayFetch: `/data/trips/${props.params.name}/${props.params.day}.json`
}))(Day)
