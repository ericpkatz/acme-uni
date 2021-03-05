const express = require('express');
const app = express();
const { models: { School, Student }} = require('./db');

module.exports = app;

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
