const {graphql, buildSchema } = require('graphql');


class User {
    constructor({firstName, lastName}){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    ip(_args, context){
        return context.ip.toString();
    }
    friends(){
        return [
            new User({firstName: this.firstName + Math.random()}),
            new User({firstName: this.firstName + Math.random()})
        ]
    }
}


const schema = buildSchema(`
    type Query {
        user: User
    }
    type User {
        firstName: String
        lastName: String
        friends: [User]
        ip: String
    }
`);

rootValue = {
    user: {
        firstName: () => {
            console.log('first name');
            return 'Alexey'
        },
        lastName: () => {
            console.log('last name');
            return 'Zolotykh'
        },
        friends: async (args, context, info) => {
            const user = new User({firstName: 'Alexey2', lastName: 'Zolotykh'})
            return [user];
        }
    },
}

source = '{ user {firstName, friends { ip firstName friends { firstName ip friends { firstName ip } }} } }'


const contextValue  = {
    ip: Math.random()
}


graphql({schema, rootValue, source, contextValue}).then(({data, errors}) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(errors,null, 2));
});
