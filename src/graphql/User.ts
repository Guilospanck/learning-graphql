import { extendType, objectType } from "nexus";

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('links', {
      type: 'Link',
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .links()
      }
    })
    t.nonNull.list.field("votes", {
      type: "Link",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: context.userId } })
          .votes()
      }
    })
  },
})

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllUsers", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.user.findMany()
      }
    })
  },
})