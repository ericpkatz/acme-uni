import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { createStudent, createSchool } from './store';

const Home = ({ students, schools, addRandomStudent, addRandomSchool })=> {
  return (
    <ul>
      <li>
        <div>We have <span>{ students.length }</span> Students</div>
      </li>
      <li>
        <div>
          We have <span>{ students.filter( student => student.schoolId).length }</span> Students who are enrolled
        </div>
      </li>
      <li>
        <div>
          We have <span>{ students.filter( student => !student.schoolId).length }</span> Students who are unenrolled
        </div>
      </li>
      <li>
        <div>
          We have <span>{ schools.length }</span> Schools
        </div>
      </li>
      <li>
        <button onClick={ addRandomStudent }>Add A Random Student</button>
      </li>
      <li>
        <button onClick={ addRandomSchool }>Add A Random School</button>
      </li>
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
