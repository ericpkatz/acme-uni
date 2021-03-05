import React from 'react';
import { connect } from 'react-redux';

const Students = ({ students })=> {
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
  }
)(Students);
