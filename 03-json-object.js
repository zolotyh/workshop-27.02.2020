const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql')


const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        name: {
            type: GraphQLString,
            resolve: () => {
                return 'Dima';
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootGraphQLQuery',
        fields: {
            hello: {
                type: User,
                resolve: () => {
                    return {}
                }
            }
        }
    })
});

const source = '{ hello {name} }';

graphql({schema, source}).then(({data}) => {
    console.log(JSON.stringify(data,null, 2));
});
