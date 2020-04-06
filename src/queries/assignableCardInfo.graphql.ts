const ProjectCardIssueNodeFragment = `
  fragment ProjectCardIssueNode on Issue {
    id
    number
    assignees(first: 100) {
      nodes {
        name
        login
        id
      }
    }
  }
`

const ProjectCardPrNodeFragment = `
  fragment ProjectCardPrNode on PullRequest {
    id
    number
    assignees(first: 100) {
      nodes {
        name
        login
        id
      }
    }
  }
`

export const assignableCardInfo = `
  ${ProjectCardIssueNodeFragment}
  ${ProjectCardPrNodeFragment}
  query assignable($id: ID!) {
    node(id: $id) {
      __typename
      ... on ProjectCard {
        project{
          name
          url
        }
        column{
          name
          url
        }
        content {
          __typename
          ... on Issue {
            ...ProjectCardIssueNode
          }
          ... on PullRequest {
            ...ProjectCardPrNode
          }
        }
      }
    }
  }
`
