const { gql } = require('apollo-server')

const typeDefs = gql`
	type Address {
		street: String!
		city: String!
	}

	type Person {
		name: String!
		phone: String
		address: Address!
		id: ID!
	}

	enum YesNo {
		YES
		NO
	}

	type Query {
		personCount: Int!
		allPersons(phone: YesNo): [Person!]!
		findPerson(name: String!): Person
		me: User
	}

	type Mutation {
		addPerson(
			name: String!
			phone: String
			street: String!
			city: String!
		): Person
		editNumber(name: String!, phone: String!): Person

		createUser(username: String!): User
		login(username: String!, password: String!): Token
		addAsFriend(name: String!): User
	}

	type User {
		id: ID!
		username: String!
		friends: [Person!]!
	}

	type Token {
		token: String!
	}
`

module.exports = typeDefs