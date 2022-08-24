import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

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
  }
})

let links: NexusGenObjects['Link'][] = [
  {
    id: 1,
    url: 'www.howtographql.com',
    description: 'Site one',
  },
  {
    id: 2,
    url: 'www.test.com',
    description: 'Site two'
  },
]

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
        return links
      }
    }),
      t.field('link', {
        type: 'Link',
        args: {
          id: nonNull(intArg())
        },
        resolve(parent, args, context, info) {
          return links.find(item => item.id === args.id) ?? null
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
      resolve(parent, args, context) {
        const { description, url } = args
        let idCount = links.length + 1
        const link = {
          id: idCount,
          description,
          url
        }
        links.push(link)
        return link
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
        let link = links.find(item => item.id === id)
        if (!link) {
          // creates a new one
          link = {
            id,
            url: url ?? '',
            description: description ?? ''
          }

          links.push(link)
        } else {
          link.url = url ?? link.url
          link.description = description ?? link.description
          const index = links.findIndex(item => item.id === id)
          links[index] = link
        }
        return link
      }
    })
    t.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg())
      },
      resolve(parent, args, context, info) {
        const index = links.findIndex(item => item.id === args.id)
        if(index === -1) {
          return null
        }
        const link = links.at(index)
        links.splice(index, 1)
        return link
      }
    })
  },
})