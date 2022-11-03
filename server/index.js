const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 4000;
const app = express();

app.use(
    '/graphql', 
    graphqlHTTP({   // graphQL endpoint schema being exported
    schema,
    graphiql: process.env.NODE_ENV === 'development'
})//graphQL results vs API: you only get data you want with graphQL
);

app.listen(port, console.log(`Server running on post ${port}`));