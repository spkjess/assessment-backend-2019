const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
mongoose.Promise = global.Promise

const { seedUsers } = require('./db-init')

import Incident from './graphql/schemas/Incident';
import incidentResolver from './graphql/resolvers/Incident';

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
  .then(async () => {
    console.log('INFO: Connected to the database')

    await seedUsers()

    const server = new ApolloServer({ typeDefs: [Incident], resolvers: [incidentResolver] });

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
