import React from 'react'


export default class Style extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.style = (function() {
            // Create the <style> tag
            var style = document.createElement("style");

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style;
        })();

        var sheet = this.style.sheet;

        this.props.rules.forEach(function (rule) {
            sheet.insertRule(rule, 0);
        });
    }

    componentWillUnmount() {
        document.head.removeChild(this.style);
    }

	render() {
        return null;
    }
}
