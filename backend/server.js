// Apollo
const { ApolloServer, gql } = require('apollo-server')

// GraphQL
const personTypeDefs = require('./schema/types/personSchema')
const userTypeDefs = require('./schema/types/userSchema')
const resolvers = require('./schema/resolvers/resolvers')

// MongoDB
const connectDB = require('./config/db')
const Person = require('./models/personModel')
const persons = require('./personsData')

// Enable access to .env variables
require('dotenv').config()

// Connect to mongoDB
connectDB()

// Import seeder data
const importData = async () => {
	const data = await Person.insertMany(persons)
	console.log(data)
}

// Delete seeder data
const deleteData = async () => {
	const data = await Person.deleteMany()
	console.log(data)
}

// Call seeder data functions based on args
if (process.argv[2] === 'import') {
	importData()
}

if (process.argv[2] === 'delete') {
	deleteData()
}

// Extending on these baseTypes so the person and user defs can be merged
// source: https://stackoverflow.com/questions/60747549/how-to-split-type-definitions-and-resolvers-into-separate-files-in-apollo-server
const baseTypeDefs = gql`
	type Query
	type Mutation
`

// Set up Apollo Server and listen
const apolloServer = async () => {
	const server = new ApolloServer({
		typeDefs: [baseTypeDefs, personTypeDefs, userTypeDefs],
		resolvers,
	})

	const { url } = await server.listen()
	console.log(`Server ready at ${url}`)
}

// Initialize server
apolloServer()
