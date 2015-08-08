
var React = require('react');
var $ = require('jquery');

var Form = React.createClass({

	render: function() {
		return(
			<form id="uploadForm" encType="multipart/form-data" action="/api/photo" method="post">
    		<select name="category">
		    	<option value="tops">Top</option>
		    	<option value="bottoms">Bottom</option>
		    	<option value="shoes">Shoes</option>
		    	<option value="accessories">Accessories</option>
		    	<option value="onesie">Onesie</option>
    		</select>
		    <input type="text" placeholder="color" name="itemColor"/>
		    <input type="file" name="userPhoto"/>
		    <input type="submit" value="Upload Image" name="submit"/>
  		</form>

	)}
});
module.exports = Form;
