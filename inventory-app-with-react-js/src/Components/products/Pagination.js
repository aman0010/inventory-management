import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Pagination extends Component {
	state = {
		search: '',
		sortBy: 'name',
		sort: 'asc',
		limit: '6',
		page: '1',
	}

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value});
		setTimeout(() => this.props.callBack(this.state), 250);
	}
	render() {
		return (
			<div id="title" className="container">

				<div className="row">

					<div className="col-md-2 col-sm-4 col-5 mb-1">
							<select defaultValue="Sort By" className="form-control" name="sortBy" onChange={this.handlerChange}>
						      <option disabled>Sort By</option>
						      <option value="name">Name</option>
						      <option value="id_category">Category</option>
						      <option value="quantity">Quantity</option>
						      <option value="date_updated">Date</option>
						  </select>
					</div>
					<div className="col-md-2 col-sm-4 col-5 mb-1">
							<select defaultValue="ASC" className="form-control" name="sort" onChange={this.handlerChange}>
				      		<option value="asc">ASC</option>
				      		<option value="desc">DESC</option>
				      </select>
					</div>
					<div className="col-md-2 col-sm-4 col-5 mb-1">
								<select defaultValue="6" className="form-control" name="limit" onChange={this.handlerChange}>
							      <option value="6">6</option>
							      <option value="9">9</option>
							      <option value="12">12</option>
							      <option value="15">15</option>
						    	</select>
					</div>
					<div className="col-md-2 col-sm-4 col-5 mb-1">
							<select defaultValue="Select Page" className="form-control" name="page" onChange={this.handlerChange}>
							  	<option disabled>Select Page</option>
								{
									this.props.pagination.map(num => {
										return <option value={num} key={num}>{num}</option>
									})
								}
							</select>
					</div>
					<div className="col-md-2 col-sm-4 col-5 mr-sm-0 ml-sm-auto">	
							<form className="form-inline">
					        	<input className="form-control" type="search" name="search" placeholder="Search" aria-label="Search" onChange={this.handlerChange} style={{maxWidth: '100%'}}/>
					    </form>
					</div>

				</div>
			</div>
		)
	}

}
export default Pagination;
