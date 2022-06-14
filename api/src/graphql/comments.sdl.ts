export const schema = gql`
  type Comment {
    id: Int!
    name: String!
    body: String!
    postId: Int!
    post: Post!
    createdAt: DateTime!
  }

  type Query {
    comments: [Comment!]! @requireAuth
  }

  input CreateCommentInput {
    name: String!
    body: String!
    postId: Int!
  }

  input UpdateCommentInput {
    name: String
    body: String
    postId: Int
  }
`
