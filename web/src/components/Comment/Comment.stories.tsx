import Comment from './Comment'

const COMMENT = {
  id: 1,
  name: 'Tom Cameron',
  body: 'This is the first comment',
  createdAt: '2022-01-01T12:34:56Z',
  postId: 1,
}

export const defaultView = () => {
  return (
    <div className="m-4">
      <Comment comment={COMMENT} />
    </div>
  )
}

export const moderatorView = () => {
  mockCurrentUser({
    id: 1,
    roles: 'moderator',
    email: 'moderator@moderator.com',
  })

  return (
    <div className="m-4">
      <Comment comment={COMMENT} />
    </div>
  )
}

export default { title: 'Components/Comment' }
