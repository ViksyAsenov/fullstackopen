const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          return []
        }

        const booksByAuthor = await Book.find({ author: author.id }).populate('author')

        if (args.genre) {
          return Book.find({ author: author.id, genres: args.genre }).populate('author')
        }

        return booksByAuthor
      }

      return Book.find({ genres: args.genre }).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'FORBIDDEN',
            invalidArgs: args,
            error,
          },
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const authorExists = await Author.findOne({ name: args.author })

      if (!authorExists) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }

      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
