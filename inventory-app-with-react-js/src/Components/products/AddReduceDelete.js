import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap'

const token = localStorage.getItem('token');
class AddReduceDelete extends Component {
	state = {
		quantity : 0,
		modalShow: false,
		action: ''
	}
	setModalShow = (value, act) => {
		this.setState({modalShow: value, action: act})
	};

	MyVerticallyCenteredModal = (props) => {
		if (this.state.action === 'add'){
			return (
				<Modal
					{...props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="mr-auto ml-auto">
					<label className="mr-2">No of products to add: </label>
					<input type='number' min="1" id='num-add' style={{width: '75px'}}></input>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={this.AddReduceQty} className="btn btn-primary mr-2" value="add"> Add </button>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
				</Modal>
			);
		} else if (this.state.action === 'reduce') {
			return (
				<Modal
					{...props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Reduce Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="mr-auto ml-auto">
					<label className="mr-2">No of products to reduce: </label>
					<input type='number' min="1" id='num-reduce' style={{width: '75px'}}></input>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={this.AddReduceQty} className="btn btn-warning mr-2" value="reduce"> Reduce </button>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
				</Modal>
			);
		} else return null
	}

	AddReduceQty = e => {
        const {id} = this.props.item;
		e.preventDefault();
		let value
		const action = e.target.value;
		if (action === 'add'){
			value = document.getElementById('num-add').value
		} else {
			value = document.getElementById('num-reduce').value
		}
        axios.patch(`/products/${id}?act=${action}&value=${value}`, {headers: {authorization: token}})
        .then(res=>{
			if(action === 'add'){
                this.props.item.quantity += parseInt(value);
                this.setState({quantity: this.props.item.quantity})
                this.setModalShow(false)
            }else{
                this.props.item.quantity -= parseInt(value);
                this.setState({quantity: this.props.item.quantity})
                this.setModalShow(false)
            }
        })
        .catch(err => console.log(err))
    }
	render() {
		const {id, name, image, category, quantity} = this.props.item;
		return (
			<div className='border col-md-3 col-sm-5 border mx-4 mt-5 mb-3 p-2'>
				<div className="text-center">
					<Link to={'/products/' + id } >
						<img src={image} onError={() => {this.props.item.image = 'https://icon-library.net/images/inventory-icon/inventory-icon-10.jpg'; this.forceUpdate()}}  className="img-fluid d-inline-block img-h" style={{border: '2px solid grey', borderRadius: '10px'}}/>
					</Link>
				</div>
				<div className="p-3">
					<h5><Link to={'/products/' + id } style={{textDecoration: 'none'}}>{name}</Link></h5>
					<p>Category: {category}<br/>
					   Quantity: {quantity}</p>

					<button onClick={() => this.setModalShow(true, "add")} className="btn btn-primary m-1" value="add"> Add </button>
					<button onClick={() => this.setModalShow(true, "reduce")} className="btn btn-warning m-1" value="reduce"> Reduce </button>
					<button type="button" onClick={this.props.delete.bind(this, id)} className="btn btn-danger m-1"> Delete </button>
					
					<this.MyVerticallyCenteredModal
						show={this.state.modalShow}
						onHide={() => this.setModalShow(false)}
					/>

				</div>
			</div>
		)
	}
}
export default AddReduceDelete;
