import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

import history from './history'
import { Trips, Trip, Day, Viewer } from './components'


var router = (
            <Router history={history}>
                <Route path="/" component={Trips}></Route>
                <Route path="/:name" component={Trip}>
                    <Route path=":day" component={Day}>
                        <Route path=":index" component={Viewer} />
                    </Route>
                </Route>
            </Router>
        );

ReactDOM.render(<Provider store={store}>{router}</Provider>, document.getElementById('root'));
