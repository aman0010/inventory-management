import React, {Component} from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import AuthService from '../users/AuthService';
export default class Headers extends Component{

    Auth = new AuthService();

  _handleLogout = () => {
  this.Auth.logout()
  this.props.history.replace('/login');
  }
    render(){
        return(
            <Navbar style={{backgroundImage: 'linear-gradient(to right, #4e15c3, #7633ff)'}} expand="lg">
                <Navbar.Brand href="/" className='mr-auto ml-3' style={{color: 'white'}}>Inventory App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ml-5">
                <Nav.Link><Link to='/' style={{color: 'white'}}>Home</Link></Nav.Link>
                <Nav.Link><Link to='/add' style={{color: 'white'}}>Add Product</Link></Nav.Link>
                <Nav.Link><Link to='/add' style={{color: 'white'}}>Add Category</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
        )
    }
}
