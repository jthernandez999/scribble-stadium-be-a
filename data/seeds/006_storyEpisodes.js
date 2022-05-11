/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require('@faker-js/faker');

const storyEpisodes = [
  {
    storyId: 1,
    episodeId: 1,
    textImgUrl: 'https://i.imgur.com/qZQXQZu.png',
    audioUrl: 'https://i.imgur.com/qZQXQZu.mp3',
    content: faker.lorem.paragraph(),
  },
  {
    storyId: 2,
    episodeId: 2,
    textImgUrl: 'https://i.imgur.com/qZQXQZu.png',
    audioUrl: 'https://i.imgur.com/qZQXQZu.mp3',
    content: faker.lorem.paragraph(),
  },
  {
    storyId: 3,
    episodeId: 3,
    textImgUrl: 'https://i.imgur.com/qZQXQZu.png',
    audioUrl: 'https://i.imgur.com/qZQXQZu.mp3',
    content: faker.lorem.paragraph(),
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('storyEpisodes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('storyEpisodes').insert(storyEpisodes);
    });
};
