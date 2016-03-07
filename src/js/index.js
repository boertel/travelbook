import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import { Trips, Trip, Day, Viewer } from './components'

ReactDOM.render((
            <Router history={browserHistory}>
                <Route path="/" component={Trips}></Route>
                <Route path="/:name" component={Trip}>
                    <Route path=":day" component={Day}>
                        <Route path=":index" component={Viewer} />
                    </Route>
                </Route>
            </Router>
            ), document.getElementById('root'));
