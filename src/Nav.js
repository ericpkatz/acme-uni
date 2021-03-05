import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ links })=> {
  return (
    <nav>
      {
        links.map( (link, idx) => {
          return (
            <Link className={link.selected ? 'selected': ''} key={ idx } to={ link.to }>{ link.text }</Link>
          );
        })
      }
    </nav>
  );
};

export default connect(
  ({ schools, students}, { location })=> {

    const links = [
      {
        text: 'Home',
        to: '/',
        selected: location.pathname === '/'
      },
      {
        text: `Students (${students.length})`,
        to: '/students',
        selected: location.pathname === '/students'
      },
      {
        text: `Schools (${schools.length})`,
        to: '/schools',
        selected: location.pathname === '/schools'
      }
    ];

    return {
      links
    };
  },
)(Nav);
