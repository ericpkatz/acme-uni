import React from 'react';
import { connect } from 'react-redux';

const Home = ({ students, schools })=> {
  return (
    <ul>
      <li>We have <span>{ students.length }</span> Students</li>
      <li>We have <span>{ students.filter( student => student.schoolId).length }</span> Students who are enrolled</li>
      <li>We have <span>{ students.filter( student => !student.schoolId).length }</span> Students who are unenrolled</li>
      <li>We have <span>{ schools.length }</span> Schools</li>
    </ul>
  );
};

export default connect(
  (state)=> state 
)(Home);
