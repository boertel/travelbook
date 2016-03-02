import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'


export default function Timeline(props) {
    var days = _.range(1, props.days + 1).map((day) => {
        var to = '/t/' + props.name + '/' +  day;
        return (<li key={day}><Link to={to} activeClassName="active">{day}</Link></li>)
    })
    return (<div className="timeline">
                <ul>{days}</ul>
            </div>
            )
}
