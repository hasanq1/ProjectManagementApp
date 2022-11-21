//  const {projects, clients } = require('../sampleData.js');
// Import mongoose models after creating them
const Project = require('../models/Project');
const Client = require('../models/Client');

 const {
    graphql, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
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
                return client.findById(parent.clientId)
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
            return Project.find();
            },
        },
        project:{
        type: ProjectType,
        args: { id: { type :GraphQLID}}, // method to loop and find the arg values
        resolve(parent, args){
            return Project.findById(args.id);
            },
        },
        //Client query 
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
            return Client.find();
            },
        },
        client:{
        type: ClientType,
        args: { id: { type :GraphQLID}}, // method to loop and find the arg values
        resolve(parent, args){
            return Client.findById(args.id);
            },
        },
    }
 });

// Mutations amek changes to the database
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
    //Add a client
      addClient: {
        type: ClientType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            phone: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args){
            const client = new Client({
                name: args.name,
                email: args.email,
                phones: args.phone,
            });
            return client.save();
        },
      },
      // Delete a client
      deleteClient:{
        type: ClientType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args){
            return Client.findByIdAndRemove(args.id);
        }
      },
    },
});



 module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
 })