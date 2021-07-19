import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'

const ALL_PERSONS = gql`
	query {
		allPersons {
			name
			phone
			id
		}
	}
`

const App = () => {
	const { loading, data } = useQuery(ALL_PERSONS)

	return (
		<div>
			{loading && <h3>Loading...</h3>}
			{data && <Persons persons={data.allPersons} />}
		</div>
	)
}

export default App
