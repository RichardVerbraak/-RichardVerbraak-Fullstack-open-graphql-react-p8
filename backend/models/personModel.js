const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Setting required to true is redundant because GraphQL already ensures the fields exist but it's good to also have validation in the DB
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
	},
	phone: {
		type: String,
		minlength: 5,
	},
	street: {
		type: String,
		required: true,
		minlength: 5,
	},
	city: {
		type: String,
		required: true,
		minlength: 3,
	},
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
