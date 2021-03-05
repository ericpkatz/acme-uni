const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const Student = conn.define('student', {
  name: {
    type: STRING
  }
});

const School = conn.define('school', {
  name: {
    type: STRING
  }
});

Student.belongsTo(School);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [apex, acme ] = await Promise.all(
    [
      {name: 'Apex Tech'}, { name: 'Acme U'}
    ]
    .map(school => School.create(school)) 
  );
  const [moe, lucy, larry, curly, ethyl ] = await Promise.all(
    [
      { name: 'moe'},
      { name: 'lucy'},
      { name: 'larry'},
      { name: 'curly'},
      { name: 'ethyl'},
    ]
    .map(student => Student.create(student)) 
  )
  await Promise.all([
    moe.update({ schoolId: acme.id }),
    lucy.update({ schoolId: acme.id }),
    larry.update({ schoolId: apex.id })
  ]);
};

module.exports = {
  syncAndSeed,
  models: {
    School,
    Student
  }
};
