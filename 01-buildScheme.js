const {graphql, buildSchema } = require('graphql');


const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

rootValue = {
    hello: 'world'
}

source = '{hello}'

graphql({schema, rootValue, source}).then(({data}) => {
    console.log(JSON.stringify(data));
});
