import { expect } from 'chai';
import request from 'supertest';
import server from '../server';

describe('Tests for citizen controller', () => {
  describe('Test for create citizen', () => {
    it('should return an error if the name field is omitted', (done) => {
      request(server)
        .post('/api/v1/citizen/create')
        .send({
          gender: 'male'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.name[0]).to.equal('The name field is required.');
          done();
        })
    });
    it('should return an error if the gender field is omitted', (done) => {
      request(server)
        .post('/api/v1/citizen/create')
        .send({
          name: 'Usman'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.gender[0]).to.equal('The gender field is required.');
          done();
        })
    });
    it('should create a new citizen', (done) => {
      request(server)
        .post('/api/v1/citizen/create')
        .send({
          name: 'Usman',
          gender: 'male',
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Citizen created');
          expect(res.body.newCitizen).to.have.keys([
            'id',
            'locationId',
            'name',
            'gender',
            'createdAt',
            'updatedAt'
          ]);
          done();
        })
    });
  });
});