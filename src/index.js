import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import store, { fetchStudents, fetchSchools } from './store';
import Nav from './Nav';




class _App extends Component{ 
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <HashRouter>
        <div>
          <Route component={ Nav } />
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
