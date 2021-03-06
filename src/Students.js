import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from './store';

const Students = ({ students, deleteStudent, schools, updateStudent })=> {
  return (
    <ul>
      {
        students.map(student => {
          return (
            <li key={ student.id }>
              {
                student.name
              }
             <select onChange={ (ev)=> updateStudent({...student, schoolId: ev.target.value || null})}>
                <option value=''>Not Enrolled</option>
                {
                  schools.map( school => {
                    return (
                      <option key={ school.id } value={ school.id } selected={ school.id === student.schoolId}>{ school.name }</option>
                    );
                  })
                }
             </select>
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
      schools,
      students: students.map( student => {
        return {...student, school: schools.find(school => school.id == student.schoolId) };
      })
    };
  },
  (dispatch)=> {
    return {
      deleteStudent: (student)=> dispatch(deleteStudent(student)),
      updateStudent: (student)=> dispatch(updateStudent(student))
    };
  }
)(Students);
