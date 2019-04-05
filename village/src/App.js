import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  // CDM Get request
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err))
  }

  // Add Smurf with Post Request
  addItem = object => {
    axios
      .post('http://localhost:3333/smurfs', object)
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err))
  }

  // Delete Smurf with Delete Request
  deleteItem = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err))
  }

  // Update Smurf with Put Request
  updateItem = (id, object) => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, object)
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err))
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
       <nav className = 'navBar'>
        <h1>Welcome to SmurfVille</h1>
        <NavLink to = '/' >Click to Enter the Village</NavLink>
        <NavLink to = '/smurf-form/' >Add a Smurf Form</NavLink>
       </nav>
       <Route 
          path = '/smurf-form'
          render = {(props) =>
            <SmurfForm 
              {...props}
              addItem = {this.addItem}
            />}
       />

       <Route 
        exact path = '/'
        render = {(props) =>
          <Smurfs
            {...props}
            smurfs = {this.state.smurfs}
            deleteItem = {this.deleteItem}
          />}
       />
      </div>
    );
  }
}

export default App;
