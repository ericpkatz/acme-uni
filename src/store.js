import axios from 'axios';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const SET_STUDENTS = 'SET_STUDENTS';
const SET_SCHOOLS = 'SET_SCHOOLS';

const setStudents = (students)=> {
  return {
    type: SET_STUDENTS,
    students
  };
};

const setSchools = (schools)=> {
  return {
    type: SET_SCHOOLS,
    schools
  };
};

const studentsReducer = (state = [], action)=> {
  if(action.type === 'SET_STUDENTS'){
    return action.students;
  }
  return state;
};

const schoolsReducer = (state = [], action)=> {
  if(action.type === 'SET_SCHOOLS'){
    return action.schools;
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export const fetchSchools = ()=> {
  return async(dispatch)=> {
    dispatch(setSchools((await axios.get('/api/schools')).data));
  };
};

export const fetchStudents = ()=> {
  return async(dispatch)=> {
    dispatch(setStudents((await axios.get('/api/students')).data));
  };
};

export default store;
