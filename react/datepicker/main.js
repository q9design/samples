var React = require('react')
var DatePicker = require('react-datepicker')
var moment = require('moment')
var ReactDom = require('react-dom')


require('react-datepicker/dist/react-datepicker.css');
 
var Example = React.createClass({
  displayName: 'Example',
 
  getInitialState: function() {
    return {
      startDate: moment()
    };
  },
 
  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },
 
  render: function() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange} />;
  }
});


ReactDom.render(
	<DatePicker />,
	document.querySelector('#app')
	)
