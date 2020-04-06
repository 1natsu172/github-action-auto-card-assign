export const assignableIssue = {
  node: {
    __typename: 'ProjectCard',
    project: {
      name: 'test-project',
      url:
        'https://github.com/1natsu172/github-action-auto-card-assign/projects/1'
    },
    column: {
      name: 'In progress',
      url:
        'https://github.com/1natsu172/github-action-auto-card-assign/projects/1/columns/8515972'
    },
    content: {
      __typename: 'Issue',
      id: 'MDU6SXNzdWU1OTAzNDM4NjQ=',
      number: 2,
      assignees: {
        nodes: [
          {
            name: '1natsu',
            login: '1natsu172',
            id: 'MDQ6VXNlcjcyODIxNDU='
          }
        ]
      }
    }
  }
}

export const assignablePullRequest = {
  node: {
    __typename: 'ProjectCard',
    project: {
      name: 'test-project',
      url:
        'https://github.com/1natsu172/github-action-auto-card-assign/projects/1'
    },
    column: {
      name: 'Done',
      url:
        'https://github.com/1natsu172/github-action-auto-card-assign/projects/1/columns/8515973'
    },
    content: {
      __typename: 'PullRequest',
      id: 'MDExOlB1bGxSZXF1ZXN0Mzk5MDQ0MDI1',
      number: 3,
      assignees: {
        nodes: [
          {
            name: '1natsu',
            login: '1natsu172',
            id: 'MDQ6VXNlcjcyODIxNDU='
          }
        ]
      }
    }
  }
}
