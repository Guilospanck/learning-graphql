import { objectType, extendType } from 'nexus'
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