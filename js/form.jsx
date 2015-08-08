var React = require('react');
var $ = require('jquery');

var Form = React.createClass({
	submitForm: function() {
	},
	render: function() {
		return(
			<form id="uploadForm" enctype="multipart/form-data" action="/api/photo" method="post" onSubmit="submitForm">
    		<select name="category">
		    	<option value="top">Top</option>
		    	<option value="bottom">Bottom</option>
		    	<option value="shoes">Shoes</option>
		    	<option value="accessories">Accessories</option>
		    	<option value="onesie">Onesie</option>
    		</select>
		    <input type="text" placeholder="color" />
		    <input type="file" name="userPhoto" />
		    <input type="submit" value="Upload Image" name="submit" />
  		</form>
	)}
});
module.exports = Form;
