export const removeAssigneesFromAssignable = `
  mutation removeAssigneesFromAssignableCard(
    $assignableId: ID!
    $assigneeIds: [ID!]!
  ) {
    removeAssigneesFromAssignable(
      input: { assignableId: $assignableId, assigneeIds: $assigneeIds }
    ) {
      __typename
      assignable {
        assignees(first: 100) {
          nodes {
            name
            login
            id
          }
        }
      }
    }
  }
`
