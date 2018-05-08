const stringMaker = length => new Array(length + 1).join('a');
const { Types: { ObjectId } } = require('mongoose');

module.exports = {
  invalid: {
    title: stringMaker(141),
    description: stringMaker(5001),
    ID: 'fakeID',
    lifespan: 9,
  },

  connectionOne: (partner = false) => ({
    title: 'i need codes',
    description: 'when were you when the noob need help?',
    ownerID: new ObjectId(),
    partnerID: partner ? new ObjectId() : null,
    lifespan: 4,
  }),

  connectionTwo: (partner = false) => ({
    title: 'i need codes too man',
    description: 'i was sat at home drinking binary vodka',
    ownerID: new ObjectId(),
    partnerID: partner ? new ObjectId() : null,
    lifespan: 1,
  }),
};
