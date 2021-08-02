const { gql } = require('apollo-server')

// Types
// Mutation: This is a type used for operations that cause change
// Enum: A type used to restrict the data returned by the set values, the values being YES & NO in this case (it's nullable so could be left out)
const personTypeDefs = gql`
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

	extend type Query {
		personCount: Int!
		allPersons(phone: YesNo): [Person!]!
		findPerson(name: String!): Person
	}

	extend type Mutation {
		addPerson(
			name: String!
			phone: String
			street: String!
			city: String!
		): Person
		editNumber(name: String!, phone: String!): Person
	}
`

module.exports = personTypeDefs
