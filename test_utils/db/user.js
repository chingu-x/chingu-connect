const { Types: { ObjectId } } = require('mongoose');

module.exports = {
  invalid: {
    username: 'the--vampiire',
    // githubID: '', // we can fill these in later with validaotr
    // avatar: '',
  },
  userOne: {
    id: new ObjectId('5aee3d10b0c3121b1d5f21c1'),
    username: 'the-vampiire',
    githubID: '25523682',
    avatar: 'https://avatars3.githubusercontent.com/u/25523682?v=4',
  },
  userTwo: {
    id: new ObjectId('5aee3d10b0c3121b1d5f22d2'),
    username: 'Bigghead',
    githubID: '19599037',
    avatar: 'https://avatars0.githubusercontent.com/u/19599037?v=4',
  },
};
