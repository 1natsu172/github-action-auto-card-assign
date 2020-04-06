export const addAssigneesToAssignable = `
  mutation addAssigneesToAssignableCard(
    $assignableId: ID!
    $assigneeIds: [ID!]!
  ) {
    addAssigneesToAssignable(
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
