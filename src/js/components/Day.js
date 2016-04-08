import React from 'react'
import Color from 'color'

import { Loading, Error, Style, Viewer, Section } from './'
import { asynchronous } from '../asynchronous'


class Day extends React.Component {
    constructor(props) {
        super(props)
    }

    getRules() {
        var borderColor = this.props.day.data.color,
            color = new Color(borderColor),
            backgroundColor = color.clearer(0.5).rgbString();

        return [
            ".text:hover .hasMarker:before { background-color: " + borderColor + " !important; }",
            ".picture .hasMarker:before { border-color: " + borderColor + " !important; background-color: " + backgroundColor + " !important; }"
        ];
    }

    renderSections(sections, markers) {
        var color = this.props.day.data.color;
        return sections.map((section, key) => {
            var marker = section.args.marker !== undefined ? markers[section.args.marker] : undefined;
            return <Section {...section} marker={marker} key={key} color={color} location={this.props.location} />;
        })
    }

    render() {
        const { params, trip } = this.props;
        const { isPending, isFulfilled, data } = this.props.day;

        if (isPending) {
            return <Loading />
        } else if (isFulfilled) {
            const { sections, media, markers } = data;
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

function transform(data, props) {
    data.color = props.trip.days[parseInt(props.params.day, 10) - 1].color;
    data.media = items(data.sections);

    data.sections.filter((section) => section.type === 'image')
        .forEach((section) => {
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
    return data;
}

export default asynchronous({
    key: 'day',
    url: (props) => (`/data/trips/${props.params.name}/${props.params.day}.json`),
    transform: transform
})(Day)
