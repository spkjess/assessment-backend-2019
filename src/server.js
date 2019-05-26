const config           = require('config')
const express          = require('express')
const mongoose         = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
mongoose.Promise       = global.Promise

const { seedUsers } = require('./db-init')

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
  .then(async () => {
    console.log('INFO: Connected to the database')

    await seedUsers()

    // TODO: Initialize Apollo with the required arguments as you see fit
    const server = new ApolloServer({})

    const app = express()
    server.applyMiddleware({ app })

    const { host, port } = config.get('server')

    app.listen({ port }, () => {
      console.log(`Server ready at http://${ host }:${ port }${ server.graphqlPath }`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(-1)
  })
