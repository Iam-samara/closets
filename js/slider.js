var React = require('react');
var Images = require('./Images');

var Slider = React.createClass({
  render: function(){
    var categoryArr = [];
    for(var i = 0; i < {this.props.imgUrl}.length; i++){
        categoryArr.push(<Images imgUrl={this.props.imgUrl[i]}/>);
    }
            
    return(
      <div>
        {categoryArr}
      </div>)
  }
});
