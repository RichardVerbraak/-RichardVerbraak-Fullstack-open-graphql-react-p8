import React from 'react'

const Persons = ({ persons }) => {
	return (
		<div>
			<h2>Persons</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.phone}
				</div>
			))}
		</div>
	)
}

export default Persons
