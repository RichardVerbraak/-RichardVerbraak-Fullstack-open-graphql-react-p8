import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import CreatePersonForm from './components/CreatePersonForm'

const ALL_PERSONS = gql`
	query {
		allPersons {
			name
			phone
			id
		}
	}
`

// Could add option to poll(re-fetch) every 2 seconds so the state would update after adding users, con is pointless web traffic
const App = () => {
	const { loading, data } = useQuery(ALL_PERSONS)

	return (
		<div>
			{loading && <h3>Loading...</h3>}
			{data && <Persons persons={data.allPersons} />}
			<CreatePersonForm />
		</div>
	)
}

export default App
