import { comments, createComment, deleteComment } from './comments'
import type { StandardScenario, PostOnlyScenario } from './comments.scenarios'
import { db } from 'api/src/lib/db'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario(
    'returns all comments for a single post from the database',
    async (scenario: StandardScenario) => {
      const result = await comments({ postId: scenario.comment.jane.postId })
      const post = await db.post.findUnique({
        where: { id: scenario.comment.jane.postId },
        include: { comments: true },
      })

      expect(result.length).toEqual(post.comments.length)
    }
  )

  scenario(
    'postOnly',
    'creates a new comments',
    async (scenario: PostOnlyScenario) => {
      const commentData = {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark?',
        postId: scenario.post.bark.id,
      }
      const comment = await createComment({
        input: commentData,
      })

      expect(comment.name).toEqual(commentData.name)
      expect(comment.body).toEqual(commentData.body)
      expect(comment.postId).toEqual(scenario.post.bark.id)
      expect(comment.createdAt).not.toEqual(null)
    }
  )

  scenario(
    'allows a moderator to delete a comment',
    async (scenario: StandardScenario) => {
      mockCurrentUser({
        id: 1,
        roles: 'moderator',
        email: 'moderator@moderator.com',
      })

      const comment = await deleteComment({ id: scenario.comment.jane.id })
      expect(comment.id).toEqual(scenario.comment.jane.id)

      const result = await comments({ postId: scenario.comment.jane.id })
      expect(result.length).toEqual(0)
    }
  )

  scenario(
    'does not allow a non-moderator to delete a comment',
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 1, roles: 'user', email: 'user@user.com' })

      expect(() => deleteComment({ id: scenario.comment.jane.id })).toThrow(
        ForbiddenError
      )
    }
  )

  scenario(
    'does not allow a logget out user to delete a comment',
    async (scenario: StandardScenario) => {
      mockCurrentUser(null)

      expect(() => deleteComment({ id: scenario.comment.jane.id })).toThrow(
        AuthenticationError
      )
    }
  )
})
