import React from 'react'
import { Link } from 'react-router'


export default function Timeline(props) {
    var pages = props.pages.map(function(page, i) {
        var key = i += 1;
        var to = '/' + props.name + '/' +  key,
            style = { backgroundColor: page.color };

        return (<li key={key}><Link to={to} activeClassName="active" style={style}>{key}</Link></li>)
    })
    return (<div className="timeline">
                <ul>{pages}</ul>
            </div>
            )
}
