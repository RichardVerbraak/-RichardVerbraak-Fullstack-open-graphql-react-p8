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
	const result = useQuery(ALL_PERSONS)
	console.log(result)

	return <div></div>
}

export default App

// if (result.loading) {
// 	return <div>loading...</div>
// }
// {result && <Persons persons={result.data.allPersons} />}
