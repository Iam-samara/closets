var React = require('react');
var Images = require('./image.jsx');

var Slider = React.createClass({
  render: function(){
    var categoryArr = [];
    for(var i = 0; i < this.props.shelvesArr.length; i++){
        categoryArr.push(<Images imgUrl={this.props.shelvesArr[i].img}/>);
    };

    return(
      <div>
        {categoryArr}
      </div>
  )}
});

module.exports = Slider;
