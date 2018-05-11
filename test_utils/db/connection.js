const stringMaker = length => new Array(length + 1).join('a');
const { Types: { ObjectId } } = require('mongoose');

module.exports = {
  invalid: {
    title: stringMaker(141),
    description: stringMaker(5001),
    ID: 'fakeID',
    lifespan: 9,
  },

  connectionOne: {
    id: new ObjectId('4bee3d10b0c3121b1d5f21c1'),
    title: 'i need codes',
    description: 'when were you when the noob need help?',
    ownerID: new ObjectId('5aee3d10b0c3121b1d5f21c1'),
    partnerID: new ObjectId('5aee3d10b0c3121b1d5f22d2'),
    lifespan: 4,
  },

  connectionTwo: {
    id: new ObjectId('4baa3d10b0c3121b1d5f21c1'),
    title: 'i need codes too man',
    description: 'i was sat at home drinking binary vodka',
    ownerID: new ObjectId('5aee3d10b0c3121b1d5f22d2'),
    partnerID: new ObjectId('5aee3d10b0c3121b1d5f21c1'),
    lifespan: 1,
  },
};
