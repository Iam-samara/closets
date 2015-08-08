
var React = require('react');
var $ = require('jquery');

var Form = React.createClass({

	render: function() {
		return(
			<div className="row text-center">
				<div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-2">
					<form id="uploadForm" encType="multipart/form-data" action="/api/photo" method="post" className="form-inline">
    				<select name="category" className="form-control">
		    			<option value="tops">Top</option>
				    	<option value="bottoms">Bottom</option>
				    	<option value="shoes">Shoes</option>
				    	<option value="accessories">Accessories</option>
				    	<option value="onesie">Onesie</option>
    				</select>
						<div className="form-group">
		    			<input type="text" placeholder="Color" name="itemColor" id="itemColor" className="form-control" />
						</div>
						<div className="form-group">
				    	<input type="file" name="userPhoto" />
						</div>
						<div className="form-group">
				    	<input type="submit" value="Upload Image" name="submit" className="btn btn-success" />
						</div>
  				</form>
				</div>
			</div>
	)}
});
module.exports = Form;
