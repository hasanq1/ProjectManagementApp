 const {projects, clients } = require('../sampleData.js');

 const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    graphql, 
    GraphQLSchema,
    GraphQLList
} = require('graphql'); // import grapg QL object type 

 // Project type
 const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type:GraphQLString },
        name: { type:GraphQLString },
        description: { type:GraphQLString },
        status: { type:GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            }
        }
    })
 });

 // Client type
 const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type:GraphQLString },
        name: { type:GraphQLString },
        email: { type:GraphQLString },
        phone: { type:GraphQLString }
    })
 });

 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // Project Query
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
            return projects;
            },
        },
        project:{
        type: ProjectType,
        args: { id: { type :GraphQLID}}, // method to loop and find the arg values
        resolve(parent, args){
            return projects.find (project => project.id === args.id);
            },
        },
        //Client query 
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
            return clients;
            },
        },
        client:{
        type: ClientType,
        args: { id: { type :GraphQLID}}, // method to loop and find the arg values
        resolve(parent, args){
            return clients.find (client => client.id === args.id);
            },
        },
    }
 });

 module.exports = new GraphQLSchema({
    query: RootQuery
 })