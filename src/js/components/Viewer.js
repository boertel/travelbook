import React from 'react'

import history from '../history'
import { Medium } from './'


export default class Viewer extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
        this.previous = this.previous.bind(this)
        this.next = this.next.bind(this)
        this.close = this.close.bind(this)
    }

    root() {
        return this.props.back.substring(0, this.props.back.lastIndexOf('/'))
    }
    close(e) {
        e.preventDefault()
        history.replace(this.root())
        return false
    }

    next(e) {
        e.preventDefault();
        // TODO this.props.media.length + 1 to show "next..." section
        // and show next day or loop back at the end
        var index = (this.props.index + 1) % (this.props.media.length)
        history.push(this.root() + '/' + index)
        return false;
    }

    previous(e) {
        // TODO onEnter of viewer check if index if correct
        e.preventDefault()
        var index = (this.props.index - 1) % this.props.media.length
        if (index < 0) {
            index = this.props.media.length
        }
        history.push(this.root() + '/' + index)
        return false;
    }

    navigate(e) {
        if (e.which === 74 || e.which === 37) {
            this.previous(e);
        }
        else if (e.which === 75 || e.which === 39) {
            this.next(e);
        }
        else if (e.which === 27) {
            this.close(e);
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
        const medium = (index < media.length) ? <Medium {...media[index]} /> : null
        const counter = (index + 1) + ' of ' + media.length

        return (
                <aside className="media-viewer theme-dark">
                    <button className="button close-button" onClick={this.close}>
                        <i className="icon"></i>
                        <span className="visually-hidden">Close this overlay</span>
                    </button>
                    {medium}
                    <nav className="media-viewer-nav">
                        <div className="media-viewer-counter">{counter}</div>
                        <div className="media-viewer-previous" onClick={this.previous}>
                            <span className="visually-hidden">Go to previous image</span>
                            <div className="arrow arrow-left"></div>
                        </div>
                        <div className="media-viewer-next" onClick={this.next}>
                            <span className="visually-hidden">Go to next image</span>
                            <div className="arrow arrow-right"></div>
                        </div>
                    </nav>
                </aside>
               )
    }
}
