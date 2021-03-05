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
