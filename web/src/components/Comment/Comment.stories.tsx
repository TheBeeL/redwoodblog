import Comment from './Comment'

export const generated = () => {
  return (
    <Comment
      comment={{
        name: 'Tom Cameron',
        body: 'This is the first comment',
        createdAt: '2022-01-01T12:34:56Z',
      }}
    />
  )
}

export default { title: 'Components/Comment' }
