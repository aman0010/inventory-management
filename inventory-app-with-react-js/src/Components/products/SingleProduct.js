import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
import { Card, Button, Modal } from 'react-bootstrap';
import Headers from '../page/Header';
import empty from '../../assets/Ellipsis-1s-100px.gif'
const token = localStorage.getItem('token');

class SingleProducts extends Component {
    state = {
        item: {},
        quantity: 0,
        deleted: false,
        isLoading: true,
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

    componentWillMount() {
        const {id} = this.props.match.params;
        axios.get(`/products/${id}`)
        .then(res =>
        {

        setTimeout(() => this.setState({item: res.data.data[0], isLoading: false}), 500);

        })
        .catch(err => console.log(err))
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
    DeleteProduct = e => {
        e.preventDefault();
        const {id} = this.props.match.params
        axios.delete(`http://localhost:8080/products/${id}`, {headers : {authorization : token }})
        .then(this.setState({deleted: true}))
        .catch(err => console.log(err))
        // this.setState({
        //     products: this.state.item.filter(items=> items.id !== id)
        // })
        alert('deleted')

    }
    render() {
        const {id_product, name, description, image, category, quantity} = this.state.item;
        const {deleted} =this.state
        if(deleted === true){
          return (<Redirect push to='/'/>)
        }

        return(
            <React.Fragment>
            <Headers />
              <Card style={{ width: '50%'}}>
              <Card.Body>
              {this.state.isLoading && <img src={empty}/>}
              <div className='col-9  p-0'>
              <Card.Img variant="top" src={image} onError={() => {this.state.item.image = 'https://icon-library.net/images/inventory-icon/inventory-icon-10.jpg'; this.forceUpdate()}}  className="img-fluid d-inline-block img-h" style={{border: '2px solid grey', borderRadius: '10px'}}/>
              </div>
              </Card.Body>

              </Card>

              <Card style={{ width: '50%'}}>

              <Card.Body>
              {this.state.isLoading && <img src={empty}/>}
              <Card.Title>{name}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Card.Text>Quantity : {quantity}</Card.Text>
                  <Card.Text>{category}</Card.Text>
              </Card.Body>
              <Card.Body>
              <Link to={`/products/edit/` + id_product}><Button variant="primary" className='mr-2 ml-2'>Edit</Button></Link>
              <Button variant="primary" onClick={() => this.setModalShow(true, "add")} className='mr-2 ml-2'>Add</Button>
              <Button variant="warning" onClick={() => this.setModalShow(true, "reduce")} className='mr-2 ml-2'>Reduce</Button>
              <Button variant="danger" onClick={this.DeleteProduct} className='mr-2 ml-2'>Delete</Button>
              </Card.Body>
              </Card>
              <this.MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
              />
            </React.Fragment>
        )
    }
}
export default SingleProducts
