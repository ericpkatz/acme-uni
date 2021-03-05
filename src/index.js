import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import store, { fetchStudents, fetchSchools } from './store';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import Home from './Home';




class _App extends Component{ 
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <HashRouter>
        <div>
          <Route component={ Nav } />
          <Route path='/' exact component={ Home } />
          <Route path='/schools' component={ Schools } />
          <Route path='/students' component={ Students } />
        </div>
      </HashRouter>
    );
  }
};

const App = connect(
  ()=> {
    return {}
  },
  (dispatch)=> {
    return {
      load: ()=> {
        dispatch(fetchStudents());
        dispatch(fetchSchools());
      }
    }
  },
)(_App);


render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
