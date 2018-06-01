// Defines the Type: Query, Mutation, and reference Type resolvers

/**
 * Startup Errors:
 * Error: "Mutation/Query/*" defined in resolvers, but not in schema
 *   "*": defined in JS resolver file but not in Type schema
 *
 * Syntax Error: Expected Name, found }
 *   empty Type definition in Type schema
 *
 * Runtime Errors:
 * It is possible to write definitions in the Type schema and not have the resolvers to support it
 *   this can be exploited to establish the schema contract so dev teams can break off for work
 *
 * It is possible to write mismatched definitions between the Type schema and the resolver file
 *   the GraphiQL client will display what the Type schema defines
 */

  // a Type field resolver is the perfect place for using the 'root' parameter
  // it come in the form of a model instance for the corresponding Type
  // in this case the User database model is passed as a 'user' instance
  // now it makes  sense why the root param is first despite being unused in most other resolvers
  // it makes writing Type field resolvers clean one liners
  // especially when combined with a modern ORM like mongoose
  // mongoose provides instance methods that further support the simplistic declarative syntax

// root == instanceOfThisType --> userInstance --> user
const getCreated = user => user.ownedConnections();
const getJoined = user => user.joinedConnections();

// resolverSignature(root, args, context, info)

const getUser = (
  root,
  // Input Type objects are versatile because specific fields can be
    // hand selected through deconstruction in the resolvers
  { input: { id, githubID, username } }, // deconstructs the UserInput object - only the applicable fields are taken
  { models: { User }, authUser }, // deconstructs the context object passed in app.js graphqlExpress middleware
) => {
  // consider the order and reasoning when designing conditional chains - they are not random 
  if (id) return User.findById(id); // the id (_id) is a unique indexed key of a User document in the db collection - fastest lookup
  else if (githubID) return User.findOne({ githubID }); // also unique, not indexed, but preferred as an immutable reference
  else if (username) return User.findOne({ username }); // future abilities to change usernames makes this the last resort
  else if (authUser) return User.findById(authUser.id); // last check so that argument searches take precedence
  // TODO: throw error if not user is found
  return null; // since we cant rely on the implicit null returned by a failed find* lookup we have to explicitly return it ourselves
};

// (preference) in a case where you only need the third parameter
// write out the default names for clarity and consistency
const getUsers = (root, args, { models: { User } }) => User.find({});

module.exports = {
  // exported for unit tests
  getUser,
  getUsers,

  // reference / custom Type field resolvers for User Type must be exported
  // if you change or the names of fields in the gql Type Definition or model Schema
    // you have to resolve them manually and export them as well
  // primitive type fields / field names that mirror the model Schema
    // do not need to be written, they are automatically mapped
  User: {
    created: getCreated,
    joined: getJoined,
  },

  // this is a way of modularizing the Root Query
  // so the resolvers can all be housed in one file / directory (single source)
  // in schema.js they are combined into a single Root Query using the spread operator
  Query: {
    user: getUser, // User
    users: getUsers, // [User]
  },

  // Mutation: { },
};

// ** AS THE SCHEMA GROWS: MODULARIZING THE CODE ** //
// as a Type Definition grows (especially with regard to Mutations) it is worth considering
// breaking up the resolvers into modules under the Type directory
  // ex: '/user/resolvers/': query.js, mutation.js, field.js, index.js (for exporting)
  // tests could also be housed in this dir
