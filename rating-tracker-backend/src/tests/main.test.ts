import { expect } from 'chai';
import app from '../server';
import * as supertest from "supertest";
import * as nock from 'nock';

describe("GET /", () => {
  it("Should return 200", () => {
  	return supertest(app)
    		.get('/')
    		.expect(200);
  });
});

describe("GET /series", () => {
  it("Should return 400", () => {
    return supertest(app)
    		.get('/series')
    		.expect(400);
  });
});

describe("GET /series?series=", () => {
  it("Should return 400", () => {
    return supertest(app)
    		.get('/series?series=')
    		.expect(400);
  });
});

describe("GET /series?series=tt0944947", () => {
	beforeEach(() => {
		const seriesResponse = require('./resources/seriesResponse');

		nock('http://www.omdbapi.com/')
		  .persist()
	      .get(() => true)
	      .reply(200, seriesResponse);
	});

	it("Should return response", () => {
		return supertest(app)
			.get('/series?series=tt0944947')
			.expect(200)
			.then((response) => {
				expect(response.body.title).to.equal('Game of Thrones');
			});
	});
});