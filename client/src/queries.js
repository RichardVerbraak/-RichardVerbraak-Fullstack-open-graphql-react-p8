import { gql } from '@apollo/client'

// A fragment is used whenever you make a lot of queries requesting the same thing
// In this case returning everything from a Person (id name phone etc)
const PERSON_DETAILS = gql`
	fragment PersonDetails on Person {
		id
		name
		phone
		address {
			street
			city
		}
	}
`

const ALL_PERSONS = gql`
	query {
		allPersons {
			name
			phone
			id
		}
	}
`

const FIND_PERSON = gql`
	query findPersonByName($nameToSearch: String!) {
		findPerson(name: $nameToSearch) {
			name
			phone
			id
			address {
				street
				city
			}
		}
	}
`

const CREATE_PERSON = gql`
	mutation createPerson(
		$name: String!
		$street: String!
		$city: String!
		$phone: String
	) {
		addPerson(name: $name, street: $street, city: $city, phone: $phone) {
			name
			phone
			id
			address {
				street
				city
			}
		}
	}
`

const EDIT_NUMBER = gql`
	mutation editNumber($name: String!, $phone: String!) {
		editNumber(name: $name, phone: $phone) {
			name
			phone
			address {
				street
				city
			}
			id
		}
	}
`

const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
		}
	}
`

const PERSON_ADDED = gql`
	subscription {
		personAdded {
			...PersonDetails
		}
	}

	${PERSON_DETAILS}
`

export {
	ALL_PERSONS,
	FIND_PERSON,
	CREATE_PERSON,
	EDIT_NUMBER,
	LOGIN,
	PERSON_ADDED,
}
