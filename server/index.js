const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 4000;
const app = express();

app.use('/graphql', 
    graphqlHTTP({   // graphQL endpoint
    schema,
    graphiql: process.env.NODE_ENV === 'development'

}))

app.listen(port, console.log(`Server running on post ${port}`));