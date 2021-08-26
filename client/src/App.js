import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_PERSONS, PERSON_ADDED } from './queries'

import Persons from './components/Persons'
import CreatePersonForm from './components/CreatePersonForm'
import Message from './components/Message'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

// Could add option to poll(re-fetch) every 2 seconds so the state would update after adding users, con is pointless web traffic
const App = () => {
	const [message, setMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	// No matter where a new person is added, it will not log to the console thanks to setting up this subscription
	useSubscription(PERSON_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log(subscriptionData)
		},
	})

	const { loading, data } = useQuery(ALL_PERSONS)

	const setError = (error) => {
		setMessage(error)
		setTimeout(() => {
			setMessage(null)
		}, 10000)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()

		// Removes the cached token from apollo client (apollo caches the results)
		client.resetStore()
	}

	return (
		<div>
			{!token ? (
				<LoginForm setMessage={setMessage} setToken={setToken} />
			) : (
				<div>
					{message && <Message message={message} />}
					{loading && <h3>Loading...</h3>}
					{data && <Persons persons={data.allPersons} />}
					<CreatePersonForm setError={setError} />
					<PhoneForm setError={setError} />
					<button onClick={logout}>Logout</button>
				</div>
			)}
		</div>
	)
}

export default App
