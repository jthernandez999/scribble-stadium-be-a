const request = require('supertest');
const express = require('express');
const childSubmissionsModel = require('../../api/childSubmissions/childSubmissionsModel');
const childSubmissionsRouter = require('../../api/childSubmissions/childSubmissionsRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/childSubmissions/childSubmissionsModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authProfile', () => {
  return {
    auth0Verify: jest.fn((req, res, next) => next()),
    authProfile: jest.fn((req, res, next) => next()),
  };
});

describe('Testing childSubmissionRouter endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/submissions', '/submission'], childSubmissionsRouter);
    jest.clearAllMocks();
  });

  describe('GET all the childSubmissions by the childId -- /submissions/:childId', () => {
    test('should return 200 when profile found', async () => {
      childSubmissionsModel.getSubmissionByChildId.mockResolvedValue({
        childId: 1,
        storyId: 1,
        episodeId: 1,
        approvedAt: null,
        episodeStartDate: null,
        finishedReadingAt: null,
        finishedWritingAt: null,
        squadCreatedAt: null,
        votedAt: null,
      });
      const res = await request(server).get('/submissions/1');

      expect(res.status).toBe(200);
      expect(res.body.episodeId).toBe(1);
      expect(res.body.episodeStartDate).toBe(null);
      expect(res.body.created_at).not.toBe(null);
      expect(
        childSubmissionsModel.getSubmissionByChildId.mock.calls.length
      ).toBe(1);
    });

    it('should return 404 when no submission is found', async () => {
      childSubmissionsModel.getSubmissionByChildId.mockResolvedValue();
      const res = await request(server).get('/submissions/5');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe(
        'InvalidChild submission could not be retrieved because the childId was '
      );
    });
  });

  // describe('POST /submissions -- tests the creation of a submission', () => {
  //   it('should return 201 when a submission is created', async () => {
  //     const mockSubmission = {
  //       childId: 3,
  //       storyId: 2,
  //       episodeId: 1,
  //       approvedAt: null,
  //       episodeStartDate: null,
  //       finishedReadingAt: null,
  //       finishedWritingAt: null,
  //       squadCreatedAt: null,
  //       votedAt: null,
  //       created_at: '2022-05-10T21:37:18.236Z',
  //       updated_at: '2022-05-10T21:37:18.236Z',
  //     };
  //     childSubmissionsModel.getSubmissionByChildId.mockResolvedValue(undefined);
  //     childSubmissionsModel.addSubmission.mockResolvedValue(mockSubmission);
  //     const res = await request(server)
  //       .post('/submissions')
  //       .send(mockSubmission);

  //     expect(res.status).toBe(201);
  //     expect(res.body.mockSubmission.childId).toBe(3);
  //     expect(childSubmissionsModel.create.mock.calls.length).toBe(1);
  //   });
  // });

  // describe('Patch /submissions/:id -- tests the update of the submission by that submissions id', () => {
  //   it('should return 204 when submission is updated', async () => {
  //     const updatedSubmission = {
  //       id: 1,
  //       childId: 1,
  //       storyId: 77,
  //       episodeId: 1,
  //     };
  //     childSubmissionsModel.getSubmissionByChildId.mockResolvedValue(
  //       updatedSubmission
  //     );
  //     childSubmissionsModel.mockResolvedValue([updatedSubmission]);

  //     const res = await request(server)
  //       .patch('/submission/1')
  //       .send(updatedSubmission);
  //     expect(res.status).toBe(204);
  //     expect(res.body.submission.storyId).toBe(77);
  //     expect(childSubmissionsModel.update.mock.calls.length).toBe(1);
  //   });
  // });
});
