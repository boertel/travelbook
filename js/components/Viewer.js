import React from 'react'
import { browserHistory } from 'react-router'

import { Picture } from './'


export default class Viewer extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
    }

    root() {
        return this.props.back.substring(0, this.props.back.lastIndexOf('/'))
    }
    close() {
        browserHistory.replace(this.root())
    }

    next() {
        // TODO onEnter of viewer check if index if correct
        var index = (this.props.index + 1) % this.props.media.length
            // and show next day or loop back at the end
        browserHistory.push(this.root() + '/' + index)
    }

    previous() {
        // TODO onEnter of viewer check if index if correct
        var index = (this.props.index - 1) % this.props.media.length
        browserHistory.push(this.root() + '/' + index)
    }

    navigate(e) {
        if ([74, 37, 75, 39, 27].indexOf(e.which) !== -1) {
            e.preventDefault()
            if (e.which === 74 || e.which === 37) {
                this.previous();
            }
            else if (e.which === 75 || e.which === 39) {
                this.next();
            }
            else if (e.which === 27) {
                this.close();
            }
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.navigate)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.navigate)
    }

    render() {
        const { media, index } = this.props
        const medium = media[index]
        return (
                <div className="media-viewer">
                    <Picture src={medium.src} width={medium.width} height={medium.height} />
                </div>
               )
    }
}
