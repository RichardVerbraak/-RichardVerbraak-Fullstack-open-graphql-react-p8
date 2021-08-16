// Apollo
const { ApolloServer, gql } = require('apollo-server')

// GraphQL
const typeDefs = require('./schema/types/typeDefs')
const resolvers = require('./schema/resolvers/resolvers')

// MongoDB
const connectDB = require('./config/db')
const Person = require('./models/personModel')
const User = require('./models/userModel')

// Seeder data
const persons = require('./personsData')

// Token (JWT)
const jwt = require('jsonwebtoken')

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

// Extending on these baseTypes so the person and user defs can be merged (didnt work with context somehow)
// source: https://stackoverflow.com/questions/60747549/how-to-split-type-definitions-and-resolvers-into-separate-files-in-apollo-server
const baseTypeDefs = gql`
	type Query
	type Mutation
`

// Set up Apollo Server and listen
// typeDefs: What the data should look like (schemas)
// resolvers: How said data should be returned (logic)
// context: context shared by the multiple resolvers like in this case, the logged in user
// source on authorization in GraphQL: https://www.apollographql.com/blog/backend/auth/authorization-in-graphql/?_ga=2.45656161.474875091.1550613879-1581139173.1549828167
const apolloServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			// Check for Authorization header
			const auth = req ? req.headers.authorization : null

			const bearer = auth && auth.split(' ')[0].toLowerCase()

			// For some reason the authorization header has 'null' (string) instead of just null, can't find anything about it
			if (auth !== 'null' && bearer) {
				// Verify token
				const decodedToken = jwt.verify(
					auth.split(' ')[1],
					process.env.JWT_SECRET
				)

				// Find user and populate the friends field
				const loggedInUser = await User.findById(decodedToken.id).populate(
					'friends'
				)

				return { loggedInUser }
			}
		},
	})

	const { url } = await server.listen()
	console.log(`Server ready at ${url}`)
}

// Initialize server
apolloServer()
