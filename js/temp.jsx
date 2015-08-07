var React = require('react'),
  FileInput = require('react-file-input');

var Form = React.createClass({
  handleChange: function(file) {
    console.log(file, 'selected!');
  },

  render: function() {
    return (
      <form>
        <FileInput name="myImage"
                   accept=".png,.gif"
                   placeholder="My Image" 
                   className="inputClass"
                   onChange={this.handleChange} />
      </form>
    );
  },
});
