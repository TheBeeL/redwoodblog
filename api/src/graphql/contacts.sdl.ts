export const schema = gql`
  type Contact {
    id: Int!
    name: String!
    email: String!
    message: String!
    created_at: DateTime!
  }

  type Query {
    contacts: [Contact!]! @requireAuth
    contact(id: Int!): Contact @requireAuth
  }

  input CreateContactInput {
    name: String!
    email: String!
    message: String!
    created_at: DateTime!
  }

  input UpdateContactInput {
    name: String
    email: String
    message: String
    created_at: DateTime
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @requireAuth
    updateContact(id: Int!, input: UpdateContactInput!): Contact! @requireAuth
    deleteContact(id: Int!): Contact! @requireAuth
  }
`
