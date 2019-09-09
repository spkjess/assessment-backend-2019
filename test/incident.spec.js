import * as app from './app';
import mongoose from 'mongoose';

const config = require('config')
let db;

beforeEach(async () => {
  db = await mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
});

afterEach(async () => {
  await db.connection.close();
});

describe('Incidents', () => {
  describe('incidents (limit: INT)', () => {
    it('returns a list of incidents', async () => {
      const expectedResult = {
        "data": {
          "incidents": {
            "edges": [
              {
                "title": "title1",
                "description": "description1",
                "assignee": "John Doe",
                "status": "Created",
                "createdAt": "2018-09-09T01:45:30.514Z",
                "updatedAt": "2019-09-09T01:45:30.514Z"
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "U3VuIFNlcCAwOSAyMDE4IDA5OjQ1OjMwIEdNVCswODAwIChTaW5nYXBvcmUgU3RhbmRhcmQgVGltZSk="
            }
          }
        }
      };

      const result = await app.indexIncidents();

      expect(result.data).toEqual(expectedResult);
    });
  });
});
