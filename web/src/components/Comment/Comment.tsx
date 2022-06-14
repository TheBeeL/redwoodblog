interface Props {
  comment: {
    name: string
    createdAt: string
    body: string
  }
}

const Comment = ({ comment }: Props) => {
  return (
    <div>
      <h2>{comment.name}</h2>
      <time dateTime={comment.createdAt}>{comment.createdAt}</time>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment
