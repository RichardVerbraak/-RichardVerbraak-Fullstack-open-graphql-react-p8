const { gql } = require('apollo-server')

// the 'me' query gives the logged in user info
const userTypeDefs = gql`
	type User {
		id: ID!
		username: String!
		friends: [Person!]!
	}

	type Token {
		token: String!
	}

	extend type Query {
		me: User
	}

	extend type Mutation {
		createUser(username: String!): User
		login(username: String!, password: String!): Token
	}
`

module.exports = userTypeDefs
