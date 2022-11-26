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
    GraphQLNonNull,
    GraphQLEnumType
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
                return Client.findById(parent.clientId) //Client = model; use the model
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

            Project.find({clientId: args.id}).then((projects)=>{
                projects.forEach(
                    (project) => {project.remove();
                });
            })
            return Client.findByIdAndRemove(args.id);
        }
      },

    // Add a project 
      addProject: {
        type: ProjectType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            status: {
                type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        'new': { value: 'Not Started' },
                        'progress': { value: 'In Progress'},
                        'completed': { value: 'Completed'}
                    }
                }),
                defaultValue: 'Not Started',
            },
            clientId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
            const project = new Project({
                name: args.name,
                description: args.description,
                status: args.status,
                clientId: args.clientId,
            });
            return project.save();
        },
      },
      //Delete a project
      deleteProject: {
        type: ProjectType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args){
            return Project.findByIdAndRemove(args.id);
        },
      },
      //Update a project
      updateProject: {
        type: ProjectType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            status: {
                type: new GraphQLEnumType({
                    name: 'ProjectStatusUpdate',
                    values: {
                        'new': { value: 'Not Started' },
                        'progress': { value: 'In Progress'},
                        'completed': { value: 'Completed'}
                    }
                }),

            },
        },
        resolve(parent, args){
            return Project.findByIdAndUpdate(
                args.id,
                {
                    $set:{
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                },
                { new: true }// if project doest exist then create a new project
            );
        }
      }
    },
});



 module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
 })