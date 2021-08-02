const jwt = require('jsonwebtoken')

const userResolver = {
	Mutation: {
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

module.exports = userResolver
