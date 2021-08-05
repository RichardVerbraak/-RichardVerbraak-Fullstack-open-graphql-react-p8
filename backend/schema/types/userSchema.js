const { gql } = require('apollo-server')

// These extended typeDefs didn't work with the whole jwt/context business, leaving it for reference later
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
		addAsFriend(name: String!): User
	}
`

module.exports = userTypeDefs
