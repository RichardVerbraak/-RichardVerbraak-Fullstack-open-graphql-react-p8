import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { setContext } from '@apollo/client/link/context'

import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider,
} from '@apollo/client'

// Adds the authorization header(s) to the ApolloClient with the token value with every GQL request
const authLink = setContext((_, { headers }) => {
	// Get token from storage
	const token = localStorage.getItem('phonenumbers-user-token')

	// Return the headers object to apollo client link object
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null,
		},
	}
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// Concatenate the headers so httpLink can read/use them
// Spread out both objects into one single objects (not this > {...authLInk, httpLink})
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: { ...authLink, ...httpLink },
})

// #### How to 'subscribe' to the client for responses
// const query = gql`
// 	query {
// 		allPersons {
// 			name
// 			phone
// 			address {
// 				street
// 				city
// 			}
// 			id
// 		}
// 	}
// `

// client.query({ query }).then((response) => {
// 	console.log(response.data)
// })

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)
