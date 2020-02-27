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
                return context.load({id});
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

                const resolveList = [];
                const idList = [];

                context.load = ({id}) => {
                    idList.push({id});
                    return new Promise((resolve) => {
                        resolveList.push(resolve);
                    })
                }

                queueMicrotask(() => {
                    console.log(idList);
                    resolveList.forEach((resolve) => {
                        resolve({firstName: 'loaded from parent resolver', lastName: 'loaded from parent controller'});
                    });
                });
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
