const request = require('supertest');
describe('booting up express', function () {
  let server;
  beforeEach(function () {
    server = require('./app');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', (done) => {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('responds to /login', (done) => {
	request(server)
	.get('/login')
	.expect(200, done);
	});
	it('responds to /register', (done) => {
		request(server)
			.get('/register')
			.expect(200, done);
		});
	it('404 invalid url', (done) => {
		request(server)
		.get('/invalidurl')
		.expect(404, done);
	});
});
