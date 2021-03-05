const { expect } = require('chai');
const { syncAndSeed } = require('../db');
const app = require('supertest')(require('../app'));

describe('API', ()=> {
  beforeEach(()=> syncAndSeed()); 
  describe('/api/schools', ()=> {
    it('returns schools', async()=> {
      const response  = await app.get('/api/schools');
      expect(response.body.length).to.equal(2);
    });
  });
  describe('/api/students', ()=> {
    it('returns students', async()=> {
      const response  = await app.get('/api/students');
      expect(response.body.length).to.equal(5);
    });
  });
});
