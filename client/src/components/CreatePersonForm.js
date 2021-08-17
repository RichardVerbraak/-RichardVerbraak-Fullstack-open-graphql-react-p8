import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS, CREATE_PERSON } from '../queries'

const CreatePersonForm = ({ setError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	// Previous solution before update was added
	// Con of re-fetching on mutation is the server not being updated when other users are altering the state
	// refetchQueries: [{ query: ALL_PERSONS }]

	// NOTE: read and write query are used for directly interacting with the cache aka previously fetched results NOT the GraphQL server
	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message)
		},
		update: (store, response) => {
			// If there isnt sufficient enough data to make the query in readQuery it will throw an error, hence the try/catch
			try {
				// Read the cached state of the ALL_PERSONS query
				const storedData = store.readQuery({ query: ALL_PERSONS })

				// Add the new person (after the createPerson mutation) directly into the cache
				// 1. Make ALL_PERSONS query to cache NOT server
				// 2. Set the cache data to what was already stored
				// 3. Overwrite allPersons to have the newly created person (addPerson is the query name in the schema)
				store.writeQuery({
					query: ALL_PERSONS,
					data: {
						...storedData,
						allPersons: [...storedData.allPersons, response.data.addPerson],
					},
				})
			} catch (error) {
				console.log(error)
			}
		},
	})

	const submitHandler = (e) => {
		e.preventDefault()

		// Phone set to null instead of empty string
		// Else you would get a validation error of phone not meeting the required 5 minLength
		createPerson({
			variables: { name, phone: phone.length > 0 ? phone : null, street, city },
		})

		setName('')
		setPhone('')
		setStreet('')
		setCity('')
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={submitHandler}>
				<div>
					name{' '}
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone{' '}
					<input
						value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<div>
					street{' '}
					<input
						value={street}
						onChange={({ target }) => setStreet(target.value)}
					/>
				</div>
				<div>
					city{' '}
					<input
						value={city}
						onChange={({ target }) => setCity(target.value)}
					/>
				</div>
				<button type='submit'>add!</button>
			</form>
		</div>
	)
}

export default CreatePersonForm
