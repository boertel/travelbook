import React from 'react'


function buildFlickrUrl(photo, size, extension) {
    extension = extension || 'jpg';
    var base = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size !== undefined) {
        base += '_' + size;
    }
    return base + '.' + extension;
}


export default function Photo(props) {
    var url;
    if (typeof props.src === 'string') {
        url = props.src;
    } else {
        if (props.src.type === 'flickr') {
            url = buildFlickrUrl(props.src);
        }
    }

    return <img src={url} width={props.width} height={props.height} />

}
