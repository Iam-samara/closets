var React = require('react');
var Slider = require('./Slider');
var $ = require('jquery');

var Closet = React.createClass({
  getInitialState: function() {
    return ({closetObj : {}});
  },
  componentDidMount: function() {
    var that = this;
    $.get('/closet').done(function(data) {
      that.setState({closetObj: data});
    });
  },
  render: function() {
    var slidersArr = [];
    for (key in this.state.closetObj) {
      slidersArr.push(<Slider shelvesArr = {this.state.closetObj[key]} />);
    }

    return(<div>{slidersArr}</div>);
  }
});

module.exports = Closet;
