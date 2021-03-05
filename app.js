const express = require('express');
const app = express();
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

app.get('/api/students', async(req, res, next)=> {
  try {
    res.send(await Student.findAll());
  }
  catch(ex){
    next(ex);
  }
});
