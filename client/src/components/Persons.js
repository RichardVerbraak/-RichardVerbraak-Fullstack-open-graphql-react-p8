import React, { useEffect, useState, useMemo } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

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

const Persons = ({ persons }) => {
	const [getPerson, result] = useLazyQuery(FIND_PERSON)
	const [person, setPerson] = useState(null)

	// getPerson will pass the variable name to the named query 'findPersonByName'
	const showPerson = (name) => {
		getPerson({ variables: { nameToSearch: name } })
	}

	// This will re-render the component whenever new data returns from finding a person (which is saved to useState)
	// If data is destructured from result and used as the dependecy, useEffect won't trigger when clicking the same person
	// this is because the previous object will be the exact same
	// This might be due to Apollo client caching query data
	useEffect(() => {
		if (result.data) {
			setPerson(result.data.findPerson)
		}
	}, [result])

	return (
		<div>
			<h2>Persons</h2>

			{person ? (
				<div>
					<h2>{person.name}</h2>
					<div>
						{person.address.street} {person.address.city}
					</div>
					<div>{person.phone}</div>
					<button onClick={() => setPerson(null)}>close</button>
				</div>
			) : (
				persons.map((person) => (
					<div key={person.name}>
						{person.name} {person.phone}
						<button onClick={() => showPerson(person.name)}>
							show address
						</button>
					</div>
				))
			)}
		</div>
	)
}

export default Persons
