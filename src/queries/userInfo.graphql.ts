export const userInfo = `
  query userInfo($login: String!) {
    user(login: $login) {
      name
      login
      id
    }
  }
`
