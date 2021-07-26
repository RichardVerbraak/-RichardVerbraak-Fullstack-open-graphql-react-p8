import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	// This will automatically update the list of persons because each person has an ID field and this will in turn mutate the person stored in cache
	const [changeNumber, result] = useMutation(EDIT_NUMBER)

	const submitHandler = (event) => {
		event.preventDefault()

		changeNumber({ variables: { name, phone } })

		setName('')
		setPhone('')
	}

	useEffect(() => {
		if (result.data && result.data.editNumber === null) {
			setError('Person not found')
		}
		// eslint-disable-next-line
	}, [result.data])

	return (
		<div>
			<h2>change number</h2>

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
				<button type='submit'>change number</button>
			</form>
		</div>
	)
}

export default PhoneForm
