import { hashHistory } from 'react-router'

const history = hashHistory;


history.segments = function() {
    return history.pathname.split('/');
};

history.build = function(path) {
    // relative path
    if (path.startsWith('.')) {
        var added, to;
        var segments = history.segments(),
            len = segments.length;
        if (path.startsWith('./')) {
            added = path.substr(2, path.length);
            to = segments;
        } else if (path.startsWith('../')) {
            added = path.substr(3, path.length);
            to = segments.slice(0, len - 2);
        }
        to.push(added);
        return to.join('/');
    }
    return path;
}
export default history
