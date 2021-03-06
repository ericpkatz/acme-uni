import axios from 'axios';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const studentsReducer = (state = [], action)=> {
  if(action.type === 'SET_STUDENTS'){
    return action.students;
  }
  if(action.type === 'CREATE_STUDENT'){
    return [...state, action.student];
  }
  if(action.type === 'DELETE_STUDENT'){
    return state.filter( student => student.id !== action.student.id); 
  }
  if(action.type === 'UPDATE_STUDENT'){
    return state.map( student => student.id === action.student.id ? action.student : student); 
  }
  if(action.type === 'DELETE_SCHOOL'){
    return state.map( student => student.schoolId === action.school.id ? {...student, schoolId: null }: student); 
  }
  return state;
};

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

const _updateStudent = (student)=> {
  return {
    student,
    type: UPDATE_STUDENT
  };
};

const _deleteStudent = (student)=> {
  return {
    student,
    type: DELETE_STUDENT
  };
};

const SET_SCHOOLS = 'SET_SCHOOLS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';

const schoolsReducer = (state = [], action)=> {
  if(action.type === 'SET_SCHOOLS'){
    return action.schools;
  }
  if(action.type === 'CREATE_SCHOOL'){
    return [...state, action.school];
  }
  if(action.type === 'DELETE_SCHOOL'){
    return state.filter( school => school.id !== action.school.id); 
  }
  return state;
};


const setSchools = (schools)=> {
  return {
    type: SET_SCHOOLS,
    schools
  };
};

const _createSchool = (school)=> {
  return {
    school,
    type: CREATE_SCHOOL
  };
};

const _deleteSchool = (school)=> {
  return {
    school,
    type: DELETE_SCHOOL
  };
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

export const updateStudent = (student)=> {
  return async(dispatch)=> {
    dispatch(_updateStudent((await axios.put(`/api/students/${student.id}`, student)).data));
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

export const deleteStudent = (student)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/students/${student.id}`);
    dispatch(_deleteStudent(student));
  };
};

export const deleteSchool = (school)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/schools/${school.id}`);
    dispatch(_deleteSchool(school));
  };
};

export default store;
