import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

import history from './history'
import { Trips, Trip, Page, Viewer } from './components'

ReactDOM.render((
            <Router history={history}>
                <Route path="/" component={Trips}></Route>
                <Route path="/:name" component={Trip}>
                    <Route path=":page" component={Page}>
                        <Route path=":index" component={Viewer} />
                    </Route>
                </Route>
            </Router>
            ), document.getElementById('root'));
