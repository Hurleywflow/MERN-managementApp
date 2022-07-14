// @ts-nocheck
const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');


const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'production'
  })
);

// this is production API endpoint deployed to server
app.use(express.static('public'));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
);


// this is REST API endpoint deploy
// __dirname = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//   // server path join to the frontend
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get('*', (req, res) => {
//     // get index.html from the frontend to show
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('Server is running');
//   });
// }
const port = process.env.PORT || 4000;
app.listen(port, console.log(`Server running on port ${port}`));
