import { connect } from 'react-refetch'


export default function (then) {
    return connect.defaults({
        handleResponse: function (response) {
            if (then) {
                return response.json().then(then)
            } else {
                return response.json();
            }
        }
    });
}
