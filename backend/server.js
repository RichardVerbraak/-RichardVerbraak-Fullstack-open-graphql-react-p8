// Apollo
const { ApolloServer } = require('apollo-server')

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

// Set up Apollo Server and listen
const apolloServer = async () => {
	const server = new ApolloServer({
		typeDefs: [personTypeDefs, userTypeDefs],
		resolvers,
	})

	const { url } = await server.listen()
	console.log(`Server ready at ${url}`)
}

// Initialize server
apolloServer()
