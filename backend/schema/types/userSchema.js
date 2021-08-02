const { gql } = require('apollo-server')

const userTypeDefs = gql`
	type User {
		id: ID!
		username: String!
		friends: [Person!]!
	}

	type Token {
		value: String!
	}

	type Query {
		me: User
	}

	type Mutation {
		createUser(username: String!): User
		login(username: String!, password: String!): Token
	}
`

module.exports = userTypeDefs
