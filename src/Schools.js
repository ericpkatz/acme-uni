import React from 'react';
import { connect } from 'react-redux';
import { deleteSchool } from './store';

const Schools = ({ schools, deleteSchool })=> {
  return (
    <ul>
      {
        schools.map(school => {
          return (
            <li key={ school.id }>
              {
                school.name
              }
              <ul>
                {
                  school.students.map( student => {
                    return (
                      <li key={ student.id }>
                        { student.name }
                      </li>
                    );
                  })
                }
              </ul>
              <button onClick={ ()=> deleteSchool(school)}>Delete</button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default connect(
  ({ schools, students })=> {
    return {
      schools: schools.map( school => {
        return {
          ...school, students: students.filter( student=> student.schoolId === school.id )
        };
      })
    };
  },
  (dispatch)=> {
    return {
      deleteSchool: (school)=> dispatch(deleteSchool(school))
    };
  }
)(Schools);
