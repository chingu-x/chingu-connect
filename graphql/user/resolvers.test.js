const {
  mockRequester,
  compareArrs,
  dbMock: { UserMock: { userOne } },
} = require('../../test_utils');

describe('User Resolver Tests', () => {
  describe('single User [user] Query', async () => {
    let requestedUser;
    beforeAll(async () => {
      const response = await mockRequester(`
        {
          user(input:{ id:"m4n33d1Ld05" }) {
            id
            username
            githubID
            avatar
          }
        }
      `);
      requestedUser = response.user;
    });
    it('should return a User document',
    () => expect(requestedUser).toBeDefined());

    it('should return the requested fields',
    () => {
      const fields = Object.keys(requestedUser);
      const expectedFields = ['id', 'username', 'githubID', 'avatar'];
      expect(compareArrs(fields, expectedFields)).toBe(true);
    });

    it('should be the requested User document',
    () => expect(requestedUser.id).toEqual(String(userOne.id)));
  });


  describe('multiple Users [users] Query', async () => {
    let allUsers;
    beforeAll(async () => {
      const response = await mockRequester(`
        query {
          users {
              id
              username
              githubID
              avatar
          }
        }
      `);
      allUsers = response.users;
    });

    it('should return an array',
    () => expect(allUsers).toBeInstanceOf(Array));

    it('should return two User documents',
    () => expect(allUsers.length).toBe(2));

    it('should return correct requested fields',
    () => expect(
      allUsers.every(user => (user.id && user.username && user.githubID && user.avatar)),
    ).toBe(true));
  });


  // describe('User -> Created Resolver', () => {
  //   let user;
  //   beforeAll(async () => {
  //     const response = await mockRequester(`
  //         {
  //           user(input:{ id:"${owner.id}"}){
  //               id
  //               created {
  //                   title
  //                   description
  //                   owner {
  //                       id
  //                   }
  //               }
  //           }
  //         }
  //       `);
  //     console.log(response.user);
  //     user = response.user;
  //   });

  //   it('should return an array', async () => {
  //     expect(user.created).toBeInstanceOf(Array);
  //   });

  //   it('should return correct requested fields', () => {
  //     const { title, description, owner } = user.created;
  //     expect(title).not.toBeNull();
  //     expect(description).not.toBeNull();
  //     expect(owner).not.toBeNull();
  //   });

  //   it('should return only connections created by user', () => {
  //     expect(user.created.every(cr => cr.owner.id === user.id)).toBe(true);
  //   });
  // });


  // describe('User -> Joined Resolver', () => {
  //   let user;
  //   beforeAll(async () => {
  //     const response = await mockRequester(`
  //       {
  //         user(input:{ id:"${owner.id}"}){
  //             id
  //             joined {
  //                 title
  //                 description
  //                 owner {
  //                     id
  //                 }
  //             }
  //         }
  //       }
  //     `);
  //     user = response.user;
  //   });

  //   it('should return an array', async () => {
  //     expect(user.joined).toBeInstanceOf(Array);
  //   });

  //   it('should return correct requested fields', () => {
  //     const { title, description, partner } = user.joined;
  //     expect(title).not.toBeNull();
  //     expect(description).not.toBeNull();
  //     expect(partner).not.toBeNull();
  //   });

  //   it('should return only connections created by user', () => {
  //     expect(user.joined.every(cr => cr.partner.id === user.id)).toBe(true);
  //   });
  // });

  // afterAll(async () => {
  //   // ===== delete everything we made =====
  //   try {
  //     await User.deleteMany({});
  //     await Connection.deleteMany({});
  //     db.disconnect();
  //   } catch (e) { console.log(e); }
  // });
});
