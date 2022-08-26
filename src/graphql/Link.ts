import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'

/**
 * Will translate to:

    type Link {
      description: String!
      id: Int!
      url: String!
    }

 */
export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('description')
    t.nonNull.string('url')
    t.field('postedBy', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy()
      }
    })
  }
})

/**
 * Will translate to

    type Query {
      feed: [Link!]!
      link(id: Int!): Link
    }

 */
export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return context.prisma.link.findMany()
      }
    }),
      t.field('link', {
        type: 'Link',
        args: {
          id: nonNull(intArg())
        },
        resolve(parent, args, context, info) {
          return context.prisma.link.findUnique({
            where: {
              id: args.id
            }
          })
        }
      })
  },
})

/**
 * Will translate to:
 
  type Mutation {
    post(description: String!, url: String!): Link!
  }
  
 */
export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        if (!context.userId) {
          throw new Error('Only authenticated users can create new links')
        }

        return context.prisma.link.create({
          data: {
            description: args.description,
            url: args.url,
            postedBy: { connect: { id: context.userId } }
          }
        })
      }
    })
    t.nonNull.field('updateLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
        url: stringArg(),
        description: stringArg()
      },
      resolve(parent, args, context, info) {
        const { id, url, description } = args
        return context.prisma.link.update({
          where: {
            id: id
          },
          data: {
            description: description ?? undefined,
            url: url ?? undefined
          }
        })
      }
    })
    t.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg())
      },
      resolve(parent, args, context, info) {
        return context.prisma.link.delete({
          where: {
            id: args.id
          }
        })
      }
    })
  },
})