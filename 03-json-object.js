const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require("graphql");

let User;

const Article = new GraphQLObjectType({
    name: "Article",
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (source, args, context) => {
                console.log(`child ${source.id}`);
                return context.load({id: source.id});
            }
        },
        author: {
            type: User,
            resolve: () => {}
        }
    })
});

User = new GraphQLObjectType({
    name: "User",
    fields: {
        name: {
            type: GraphQLString,
            resolve: () => {
                return "Dima";
            }
        },
        articles: {
            type: new GraphQLList(Article),
            resolve: (source, args, context) => {
                console.log('parent');

                const resolveCollection = [];
                const idCollection = [];

                context.load = ({id}) => {
                    return new Promise((resolve) => {
                        idCollection.push(id)
                        resolveCollection.push(resolve)
                    })
                }
                queueMicrotask(() => {
                    console.log(`select where id in ${idCollection}`);
                    resolveCollection.forEach((resolve, i) => {
                        resolve({'title': 'test'});
                    })
                })
                return [
                { id: '1'},
                { id: '2'},
                { id: '3'},
        ]}
        }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootGraphQLQuery",
        fields: {
            user: {
                type: User,
                resolve: () => {
                    return {};
                }
            }
        }
    })
});

const source = "{ user {name articles {title}} }";

graphql({ schema, source, context: {} }).then(({ data, errors }) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(errors, null, 2));
});
