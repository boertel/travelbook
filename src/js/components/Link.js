import React from 'react'

export default function Link(props) {
    var iconClassName = 'icon mega-octicon ';
    switch (props.type) {
        case 'video':
            iconClassName += 'octicon-device-camera-video'
            break;

        case 'audio':
            iconClassName += 'octicon-megaphone';
            break;

        case 'photo':
            iconClassName += 'octicon-device-camera';
            break;

        default:
            iconClassName += 'octicon-eye';
            break;
    }
    return (
            <div>
                <span className={iconClassName}></span>
                <span>{props.description}</span>&nbsp;&mdash;&nbsp;
                <a href="{props.href}" target="_blank">{props.name}</a>
            </div>
        )
}
