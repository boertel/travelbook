import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'


export default function Timeline(props) {
    var days = props.days.map(function(day, i) {
        var key = i += 1;
        var to = '/t/' + props.name + '/' +  key,
            style = { backgroundColor: day.color };

        return (<li key={key}><Link to={to} activeClassName="active" style={style}>{key}</Link></li>)
    })
    return (<div className="timeline">
                <ul>{days}</ul>
            </div>
            )
}
