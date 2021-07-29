const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema/types/types')
const resolvers = require('./schema/resolvers/resolvers')

const connectDB = require('./config/db')

const Person = require('./models/personModel')
const persons = require('./personsData')

require('dotenv').config()

connectDB()

const importData = async () => {
	const data = await Person.insertMany(persons)
	console.log(data)
}

const deleteData = async () => {
	const data = await Person.deleteMany()
	console.log(data)
}

if (process.argv[2] === 'import') {
	importData()
}

if (process.argv[2] === 'delete') {
	deleteData()
}

// These combined make up the Apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
