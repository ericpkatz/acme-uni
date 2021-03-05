import axios from 'axios';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const SET_STUDENTS = 'SET_STUDENTS';
const SET_SCHOOLS = 'SET_SCHOOLS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const CREATE_SCHOOL = 'CREATE_SCHOOL';

const setStudents = (students)=> {
  return {
    type: SET_STUDENTS,
    students
  };
};

const _createStudent = (student)=> {
  return {
    student,
    type: CREATE_STUDENT
  };
};

const _createSchool = (school)=> {
  return {
    school,
    type: CREATE_SCHOOL
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
  if(action.type === 'CREATE_STUDENT'){
    return [...state, action.student];
  }
  return state;
};

const schoolsReducer = (state = [], action)=> {
  if(action.type === 'SET_SCHOOLS'){
    return action.schools;
  }
  if(action.type === 'CREATE_SCHOOL'){
    return [...state, action.school];
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

export const createStudent = (student)=> {
  return async(dispatch)=> {
    dispatch(_createStudent((await axios.post('/api/students', student)).data));
  };
};

export const createSchool = (school)=> {
  return async(dispatch)=> {
    dispatch(_createSchool((await axios.post('/api/schools', school)).data));
  };
};

export default store;
