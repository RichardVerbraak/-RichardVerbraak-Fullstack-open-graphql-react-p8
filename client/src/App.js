import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'

import Persons from './components/Persons'
import CreatePersonForm from './components/CreatePersonForm'
import Message from './components/Message'

// Could add option to poll(re-fetch) every 2 seconds so the state would update after adding users, con is pointless web traffic
const App = () => {
	const [message, setMessage] = useState(null)

	const { loading, data } = useQuery(ALL_PERSONS)

	const setError = (error) => {
		setMessage(error)
		setTimeout(() => {
			setMessage(null)
		}, 10000)
	}

	return (
		<div>
			{message && <Message message={message} />}
			{loading && <h3>Loading...</h3>}
			{data && <Persons persons={data.allPersons} />}
			<CreatePersonForm setError={setError} />
		</div>
	)
}

export default App
