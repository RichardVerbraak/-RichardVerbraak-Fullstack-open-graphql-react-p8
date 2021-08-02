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
`

module.exports = userTypeDefs
