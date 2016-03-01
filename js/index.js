import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import { App, Trip, Day, Item } from './components'

ReactDOM.render((
            <Router history={browserHistory}>
                <Route path="/" component={App}></Route>
                <Route path="/t/:name" component={Trip}>
                    <Route path=":day" component={Day}>
                        <Route path=":item" component={Item} />
                    </Route>
                </Route>
            </Router>
            ), document.getElementById('root'));
