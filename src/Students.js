import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from './store';

const Students = ({ students, deleteStudent })=> {
  return (
    <ul>
      {
        students.map(student => {
          return (
            <li key={ student.id }>
              {
                student.name
              }
              <span>
              {
                student.school ?  student.school.name : 'not enrolled'
              }
              </span>
             <button onClick={ ()=> deleteStudent(student)}>Delete</button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default connect(
  ({ students, schools })=> {
    return {
      students: students.map( student => {
        return {...student, school: schools.find(school => school.id == student.schoolId) };
      })
    };
  },
  (dispatch)=> {
    return {
      deleteStudent: (student)=> dispatch(deleteStudent(student)) 
    };
  }
)(Students);
