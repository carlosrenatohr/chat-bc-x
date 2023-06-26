import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server.js';
// const api = supertest(app);

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /', () => {
  it('should respond with welcome message on server running', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body).to.deep.equal({ message: 'server running yeah' });
        // expect(res.body.message).to.equal('server running yeah');
        expect(res.text).to.equal('server running yeah');
        done();
      });
  });
});  
