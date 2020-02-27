const {graphql, buildSchema } = require('graphql');


const schema = buildSchema(`
    type Query {
        hello: Int
        hello2: String
        hello3: String
        hello4: String
    }
`);

rootValue = {
    hello: 'world',
    hello2: () => {
        throw new Error('Hello')
    },
    hello3: async () => 'world',
    hello4: () => {
        throw new Error('Hello')
    },
}

source = '{hello hello2 hello3 hello4}'

graphql({schema, rootValue, source}).then(({data, errors}) => {
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(errors));
});
