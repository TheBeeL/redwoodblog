import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

import type { Comment as IComment } from 'types/graphql'

const DELETE = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postId
    }
  }
`

const formatDate = (datetime: ConstructorParameters<typeof Date>[0]) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })

  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}

interface Props {
  comment: Pick<IComment, 'postId' | 'id' | 'name' | 'createdAt' | 'body'>
}

const Comment = ({ comment }: Props) => {
  const { hasRole } = useAuth()
  const [deleteMutation] = useMutation(DELETE, {
    refetchQueries: [
      { query: CommentsQuery, variables: { postId: comment.postId } },
    ],
  })
  const moderate = () => {
    if (confirm('Are you sure?')) {
      deleteMutation({ variables: { id: comment.id } })
    }
  }

  return (
    <div className="bg-gray-200 p-8 rounded-lg relative">
      <header className="flex justify-between">
        <h2 className="font-semibold text-xl text-gray-700">{comment.name}</h2>
        <time className="text-xs text-gray-500" dateTime={comment.createdAt}>
          {formatDate(comment.createdAt)}
        </time>
      </header>
      <p className="text-sm mt-2">{comment.body}</p>
      {hasRole('moderator') && (
        <button
          type="button"
          onClick={moderate}
          className="absolute bottom-2 right-2 bg-red-500 text-xs rounded text-white px-2 py-1"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default Comment
