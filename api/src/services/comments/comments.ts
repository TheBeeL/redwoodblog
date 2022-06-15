import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  CommentResolvers,
  MutationResolvers,
} from 'types/graphql'
import { requireAuth } from '../../lib/auth'

export const comments: QueryResolvers['comments'] = ({ postId }) => {
  return db.comment.findMany({ where: { postId } })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  return db.comment.create({ data: input })
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  requireAuth({ roles: 'moderator' })
  return db.comment.delete({ where: { id } })
}

export const Comment: CommentResolvers = {
  post: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).post(),
}
