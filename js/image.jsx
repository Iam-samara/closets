var React = require('react');


var style = {
  height: '100px',
	width: '100px'
};


var Images = React.createClass({
  render: function(){
    return(
      <div>
      <img src={this.props.imgUrl} style={style}/>
      </div>
  )}
});
module.exports = Images;
