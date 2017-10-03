const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Verifying express', function () {

  describe('GET /', function () {
    it('should return a response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        // .expect({
        //   error: 'Page not found'
        // })
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found'
          });
        })
        .end(done);
    });
  });

  describe('GET /users', () => {
    it('should return use object', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'A',
            age: 100
          });
        })
        .end(done);
    });
  });

});
