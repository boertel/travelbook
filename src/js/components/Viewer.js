import React from 'react'

import store from '../store'
import history from '../history'
import { Medium } from './'


export default class Viewer extends React.Component {
    constructor(props) {
        super(props);
        ['navigate', 'previous', 'next', 'close', 'onchange'].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            media: this.props.media
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.media.length > 0;
    }

    onchange() {
        var media = store.sections.get();
        this.setState({ media: media });
    }

    root() {
        return history.pathname.substring(0, history.pathname.lastIndexOf('/'));
    }

    close(e) {
        e.preventDefault()
        history.replace(this.root())
        return false
    }

    getIndex() {
        return parseInt(this.props.params.index, 10);
    }

    getCount() {
        return this.getIndex() + 1;
    }

    next(e) {
        // TODO onEnter of viewer check if index if correct
        e.preventDefault()
        var index = (this.getIndex() + 1) % (this.state.media.length + 1)
        // and show next page or loop back at the end
        history.push(this.root() + '/' + index)
        return false;
    }

    previous(e) {
        // TODO onEnter of viewer check if index if correct
        e.preventDefault()
        var index = (this.getIndex() - 1) % this.state.media.length
        if (index < 0) {
            index = this.state.media.length
        }
        history.push(this.root() + '/' + index)
        return false;
    }

    navigate(e) {
        if (e.which === 74 || e.which === 37) {
            this.previous(e);
        } else if (e.which === 75 || e.which === 39) {
            this.next(e);
        } else if (e.which === 27) {
            this.close(e);
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.navigate);
        store.sections.bind(this.onchange);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.navigate)
        store.sections.remove(this.onchange);
    }

    render() {
        var media = this.state.media;
        if (media.length === 0) {
            return <div></div>
        }
        var index = this.getIndex();

        const medium = (index < media.length) ? <Medium {...media[index]} next={this.next} previous={this.previous} /> : null
        const counter = (this.getCount()) + ' of ' + media.length

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
