import { expect } from 'chai';
import request from 'supertest';
import server from '../server';

describe('Tests for location controller', () => {
  describe('Test for create location', () => {
    it('should return an error if the name field is omitted', (done) => {
     request(server)
       .post('/api/v1/location/create')
       .send({
         malePopulation: '10',
         femalePopulation: '20',
         locality: 'Abuja'
       })
       .end((err, res) => {
        if (err) return done(err);
         expect(res.statusCode).to.equal(400);
         expect(res.body.message).to.equal('A validation error occurred');
         expect(res.body.errors.name[0]).to.equal('The name field is required.');
         done();
       });
    });
    it('should return an error if the malePopulation field is omitted', (done) => {
      request(server)
        .post('/api/v1/location/create')
        .send({
          name: 'New York',
          femalePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.malePopulation[0]).to.equal('The malePopulation field is required.');
          done();
        });
    });
    it('should return an error if the femalePopulation field is omitted', (done) => {
      request(server)
        .post('/api/v1/location/create')
        .send({
          name: 'New York',
          malePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.femalePopulation[0]).to.equal('The femalePopulation field is required.');
          done();
        });
    });
    it('should return an error if the locality field is omitted', (done) => {
      request(server)
        .post('/api/v1/location/create')
        .send({
          name: 'New York',
          malePopulation: '20',
          femalePopulation: '10'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.locality[0]).to.equal('The locality field is required.');
          done();
        });
    });
    it('should create a new location', (done) => {
      request(server)
        .post('/api/v1/location/create')
        .send({
          name: 'New York',
          malePopulation: '20',
          femalePopulation: '10',
          locality: 'Zone 1'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Location created successfully');
          expect(res.body.location).to.have.keys([
            'id',
            'name',
            'malePopulation',
            'femalePopulation',
            'locality',
            'createdAt',
            'updatedAt'
          ]);
          done();
        });
    });
  });
  describe('Test for get all locations', () => {
    it('should return a list of all locations', (done) => {
      request(server)
        .get('/api/v1/location/all')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body.locationDetails.length).to.equal(1);
          done();
      });
    });
  });
  describe('Test for update a location', () => {
    it('should update a location with a valid id', (done) => {
      request(server)
        .put('/api/v1/location/update/1')
        .send({
          name: 'Compton',
          malePopulation: '20',
          femalePopulation: '10',
          locality: 'Zone 1'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Location successfully updated');
          expect(res.body.foundLocation).to.have.keys([
            'id',
            'name',
            'malePopulation',
            'femalePopulation',
            'locality',
            'createdAt',
            'updatedAt'
          ]);
          done();
        });
    });
  });
  describe('Test for delete a locations', () => {
    it('should throw an error if the location does not exist', (done) => {
      request(server)
        .del('/api/v1/location/delete/6')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Location not found');
          done();
        });
    });
    it('should delete a location', (done) => {
      request(server)
        .del('/api/v1/location/delete/1')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Location successfully deleted');
          done();
        });
    });
  });
});