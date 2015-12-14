var React = require('react');
var ReactDOM = require('react-dom');
var Tntfleague = require('react-tntfleague');

var App = React.createClass({
	render () {
		return (
			<div>
				<Tntfleague />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
