import { objectType, extendType, nonNull, stringArg } from 'nexus'
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
  },
})