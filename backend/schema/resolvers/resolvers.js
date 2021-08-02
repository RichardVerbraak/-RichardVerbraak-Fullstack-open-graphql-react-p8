const Person = require('../../models/personModel')
const jwt = require('jsonwebtoken')

// Older resolver is in the previous exercise

// Resolvers is how GraphQL should respond to these queries (the logic behind the queries)
// There have to be resolvers for each field in each type of schema
// If there isn't, Apollo will define default resolvers for them, these are accessed through the root parameter (root being the object)
// Person: { name: (root) => root.name} is the same as person.name in this case

// Since the persons in the array do not have an address field, we have to add a resolver that returns the street and city when there is a query for address
// So when a Person object gets returned, every field is using it's default resolver to return the object except for the address field

// You can have multiple types of queries like so and also multiple of the same query (have to give alternative name)
// It's also beneficial to name the query like the last example

//// Multiple
// query {
// 	personCount
// 	allPersons {
// 		name
// 	}
// }

// Multiple of the same
// query PhoneOwnerShip {
// 	hasPhone: allPersons(phone: YES) {
// 		name
// 	}
// 	phoneless: allPersons(phone: NO) {
// 		name
// 	}
// }

// GraphQL will automatically parse the _id from MongoDB to just id, no need to manually set _id to id like other exercises
// Apollo resolvers will now return a RESOLVED promise instead of just an object
const resolvers = {
	Query: {
		personCount: () => Person.collection.countDocuments(),
		allPersons: (root, args) => {
			if (!args.phone) {
				return Person.find({})
			}

			// $exists: true will return the documents which contain a phone field, set to false is opposite
			return Person.find({ phone: { $exists: args.phone === 'YES' } })
		},
		findPerson: (root, args) => Person.findOne({ name: args.name }),
	},
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city,
			}
		},
	},
	Mutation: {
		addPerson: (root, args) => {
			// const samePerson = persons.find((person) => {
			// 	return person.name === args.name
			// })

			// if (samePerson) {
			// 	throw new UserInputError('Name must be unique', {
			// 		invalidArgs: args.name,
			// 	})
			// }

			// const id = uuidv1()
			// const person = { ...args, id }
			// persons = persons.concat(person)
			// return person

			const person = new Person({ ...args })
			return person.save()
		},
		editNumber: async (root, args) => {
			// const person = persons.find((person) => {
			// 	return person.name === args.name
			// })

			// if (!person) {
			// 	return null
			// }

			// const updatedPerson = { ...person, phone: args.phone }

			// // Update the persons array on the server
			// persons.map((person) => {
			// 	return person.name === args.name ? updatedPerson : person
			// })

			// return updatedPerson

			const person = await Person.findOne({ name: args.name })
			person.phone = args.phone
			return person.save()
		},

		createUser: (root, args) => {
			const user = new User({ username: args.username })

			try {
				return user.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials')
			}

			const userData = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userData, JWT_SECRET) }
		},
	},
}

module.exports = resolvers
