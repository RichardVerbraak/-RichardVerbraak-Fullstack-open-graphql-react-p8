import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_PERSON = gql`
	mutation createPerson(
		$name: String!
		$street: String!
		$city: String!
		$phone: String
	) {
		addPerson(name: $name, street: $street, city: $city, phone: $phone) {
			name
			phon
			id
			address {
				street
				city
			}
		}
	}
`

const createPersonForm = () => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	const [createPerson] = useMutation(CREATE_PERSON)

	const submitHandler = (e) => {
		e.preventDefault()

		createPerson({ variables: { name, phone, street, city } })
	}

	return <div></div>
}

export default createPersonForm
