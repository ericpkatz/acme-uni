const express = require('express');
const app = express();
app.use(express.json());
const { models: { School, Student }} = require('./db');
const path = require('path');

module.exports = app;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', async(req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/schools', async(req, res, next)=> {
  try {
    res.send(await School.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/schools/:id', async(req, res, next)=> {
  try {
    const school = await School.findByPk(req.params.id);
    await school.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/schools', async(req, res, next)=> {
  try {
    res.status(201).send(await School.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/students', async(req, res, next)=> {
  try {
    res.status(201).send(await Student.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/students', async(req, res, next)=> {
  try {
    res.send(await Student.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/students/:id', async(req, res, next)=> {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});
