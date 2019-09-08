const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server-express')
mongoose.Promise = global.Promise

const { seedUsers } = require('./db-init')

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
  .then(async () => {
    console.log('INFO: Connected to the database')

    await seedUsers()

    const typeDefs = gql`
      type Query {
        hello: String
      }
    `;

    const resolvers = {
      Query: {
        hello: () => 'Hello world!'
      },
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express()
    server.applyMiddleware({ app })

    const { host, port } = config.get('server')

    app.listen({ port }, () => {
      console.log(`Server ready at http://${host}:${port}${server.graphqlPath}`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(-1)
  })
