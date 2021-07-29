const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema/types/types')
const resolvers = require('./schema/resolvers/resolvers')

const connectDB = require('./config/db')

require('dotenv').config()

connectDB()

// These combined make up the Apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
