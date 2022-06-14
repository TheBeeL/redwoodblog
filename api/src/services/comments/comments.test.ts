import { comments, createComment } from './comments'
import type { StandardScenario, PostOnlyScenario } from './comments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario('returns all comments', async (scenario: StandardScenario) => {
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })

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
})
