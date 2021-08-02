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

	extend type Query {
		me: User
	}

	extend type Mutation {
		createUser(username: String!): User
		login(username: String!, password: String!): Token
	}
`

module.exports = userTypeDefs
