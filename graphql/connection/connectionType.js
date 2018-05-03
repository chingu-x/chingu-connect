const graphql = require('graphql');
const User = require('../../db/user');
const UserType = require('../user/userType');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const ConnectionType = new GraphQLObjectType({
  name: 'Connection',
  fields: {
    id: { type: GraphQLID },
    owner: {
      type: UserType,
      resolve: ({ owner }) => User.findById(owner),
    },
    partner: {
      type: UserType,
      resolve: ({ partner }) => User.findById(partner),
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    lifespan: { type: GraphQLInt },
  },
});

module.exports = ConnectionType;
