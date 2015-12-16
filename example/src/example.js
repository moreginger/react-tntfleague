var React = require('react');
var ReactDOM = require('react-dom');
var League = require('League');

var App = React.createClass({
	render () {
		return (
			<League />
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
