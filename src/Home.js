import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { createStudent, createSchool } from './store';

const Home = ({ students, schools, addRandomStudent, addRandomSchool })=> {
  return (
    <ul>
      <li>We have <span>{ students.length }</span> Students</li>
      <li>We have <span>{ students.filter( student => student.schoolId).length }</span> Students who are enrolled</li>
      <li>We have <span>{ students.filter( student => !student.schoolId).length }</span> Students who are unenrolled</li>
      <li>We have <span>{ schools.length }</span> Schools</li>
      <li><button onClick={ addRandomStudent }>Add A Random Student</button></li>
      <li><button onClick={ addRandomSchool }>Add A Random School</button></li>
    </ul>
  );
};

export default connect(
  (state)=> state,
  (dispatch)=> {
    return {
      addRandomStudent: ()=> dispatch(createStudent({ name: faker.name.firstName() })),
      addRandomSchool: ()=> dispatch(createSchool({name: `${faker.address.state()} University for ${faker.company.bsNoun()} Studies`})),
    }
  }
)(Home);
