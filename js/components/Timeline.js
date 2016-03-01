import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'


export default function Timeline(props) {
    var days = _.range(1, props.days).map((day) => {
        var to = '/t/' + props.name + '/' +  day;
        return (<li key={day}><Link to={to}>{day}</Link></li>)
    })
    return (<ul>{days}</ul>)
}
