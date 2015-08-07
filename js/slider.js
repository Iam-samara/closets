var React = require('react');
var Images = require('./Images');

var Slider = React.createClass({
  render: function(){
  console.log('console slider props:  ' + this.props.closetObj);
    var categoryArr = [];
    for(var i = 0; i < this.props.shelvesArr.length; i++){
        categoryArr.push(<Images imgUrl={this.props.shelvesArr[i].img}/>);
    };

    return(
      <div style={boxStyle}>
        {categoryArr}
      </div>)
  }
});

module.export(Slider);
