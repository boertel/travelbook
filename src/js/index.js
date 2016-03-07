import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

import history from './history'
import { Trips, Trip, Day, Viewer } from './components'

ReactDOM.render((
            <Router history={history}>
                <Route path="/" component={Trips}></Route>
                <Route path="/:name" component={Trip}>
                    <Route path=":day" component={Day}>
                        <Route path=":index" component={Viewer} />
                    </Route>
                </Route>
            </Router>
            ), document.getElementById('root'));
