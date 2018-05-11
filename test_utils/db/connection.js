const stringMaker = length => new Array(length + 1).join('a');
const { Types: { ObjectId } } = require('mongoose');

module.exports = {
  invalid: {
    title: stringMaker(141),
    description: stringMaker(5001),
    ID: 'fakeID',
    lifespan: 9,
  },

  connectionOne: (partner = false, owner = true) => ({
    id: new ObjectId('4bee3d10b0c3121b1d5f21c1'),
    title: 'i need codes',
    description: 'when were you when the noob need help?',
    ownerID: owner ? new ObjectId('5aee3d10b0c3121b1d5f21c1') : null,
    partnerID: partner ? new ObjectId('5aee3d10b0c3121b1d5f22d2') : null,
    lifespan: 4,
  }),

  connectionTwo: (partner = false, owner = true) => ({
    id: new ObjectId('4baa3d10b0c3121b1d5f21c1'),
    title: 'i need codes too man',
    description: 'i was sat at home drinking binary vodka',
    ownerID: owner ? new ObjectId('5aee3d10b0c3121b1d5f22d2') : null,
    partnerID: partner ? new ObjectId('5aee3d10b0c3121b1d5f21c1') : null,
    lifespan: 1,
  }),
};
