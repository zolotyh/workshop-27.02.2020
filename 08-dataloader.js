const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require("graphql");

const UserMetadata = new GraphQLObjectType({
    name: "UserMetadata",
    fields: {
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        }
    }
});

const User = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLString
        },
        metadata: {
            type: UserMetadata,
            resolve: ({id}, variables, context) => {
                console.log('resolver');
                return { metadata: {
                    firstName: '32432',
                }};
                // return context.load({id});
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        users: {
            type: GraphQLList(User),
            resolve: (_2, _1, context) => {
                return [{ id: 1 }, { id: 2 }];
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: Query
});
const source = `{users {metadata {firstName}}}`;

const contextValue  = {};

graphql({ schema, source, contextValue }).then(i => console.log(JSON.stringify(i)));
