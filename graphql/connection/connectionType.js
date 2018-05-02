const graphql = require('graphql');
const Connection = require('../../db/connection');
const UserType = require('../user/userType');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const ConnectionType = new GraphQLObjectType({
  name: 'Connect',
  fields: {
    id: { type: GraphQLID },
    owner: {
      type: UserType,
      resolve: parentValue => Connection.findById(parentValue.id).owner,
    },
    partner: {
      type: UserType,
      resolve: parentValue => Connection.findById(parentValue.id).partner,
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    lifespan: { type: GraphQLInt },
  },
});

module.exports = ConnectionType;
