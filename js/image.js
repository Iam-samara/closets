var React = require('react');

var Images = React.createClass({
  render: function(){
    return(
      <div>
      <img src={this.props.imgUrl} />
      </div>)
  }
});
module.export(Images);
