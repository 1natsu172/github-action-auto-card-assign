<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# GitHub Actions Auto-Card-Assign

This is GitHub Actions that sets Assignees on the card for each column of GitHub Project.

Supporting action triggers work when create or move an Issue/PullRequest card or convert a note to an Issue card.

## Screenshot
![DEMO GIF](https://raw.githubusercontent.com/1natsu172/github-action-auto-card-assign/d0035515ff6b689b43c0a65e01e3943a8dde9897/media/demo.gif)

## Usage

### Setup workflow file

example `.github/workflows/auto-card-assign.yml`

```yaml
name: "Auto card assign"
on:
  project_card:
    types: ["created", "moved", "converted"]

jobs:
  card_assign:
    runs-on: ubuntu-latest
    steps:
      - uses: 1natsu172/github-action-auto-card-assign@v1
        id: card_assign_action
        with:
          # github_token: "${{ secrets.GITHUB_TOKEN }}"
          config: "project-card-assign.yml"
```

・ `with` options

|     name     | description      |          default          | required |            e.g.             |
| :----------: | :--------------- | :-----------------------: | :------: | :-------------------------: |
|    config    | Config file name | `project-card-assign.yml` |   true   |  `card-assign-config.yml`   |
| github_token | Access token     |    `${{github.token}}`    |   true   | `${{secrets.ACCESS_TOKEN}}` |

### Configure assignees for each project column

example `.github/project-card-assign.yml`

```yaml
kanban1: # Project name
  To do: # Column name
    - "memberName1" # Login name(assignee name)
  In progress:
    - "memberName2"
  Review in progress:
    - "memberName3"
  Reviewer approved:
    - "memberName1"
    - "memberName2"
    - "memberName3"
  Done: []
```

## Config rules

### Follow the config format

* Please write yaml
  * [configure example](https://codebeautify.org/yaml-to-json-xml-csv/cbf4517b)
  * Type definition of [Config](https://github.com/1natsu172/github-action-auto-card-assign/blob/master/src/types/config.ts) = Result of [yaml to json](https://codebeautify.org/yaml-to-json-xml-csv#)
  * assignee names are expressed a `string[]`

### Write the exact name

According to the image below.

![project name and column name is here](https://github.com/1natsu172/github-action-auto-card-assign/blob/d0035515ff6b689b43c0a65e01e3943a8dde9897/media/project-and-column-name.png?raw=true)
![login name is here](https://github.com/1natsu172/github-action-auto-card-assign/blob/d0035515ff6b689b43c0a65e01e3943a8dde9897/media/login-name.png?raw=true)

**Be careful!**

* Don't add prefix `@` for login name
* Write the expected assignees for the column
  * The Assignees before the move will be deleted

## Behavior

The assignees before the move do not remain and update with the expect assignees of the column.

## FAQ

### ・How can I set 0(empty) Assignees?

Please configure as an empty array = `[]`

### ・Will the assignees before the card move remain after the move?

No, all assignees before the move will be removed.

### ・What happens if move a card to an unconfigured column?

The action itself is successful and the assignment process is skipped.



## Support action trigger events

|  eventName   | action types |
| :----------: | :----------: |
| project_card |    moved     |
| project_card |   created    |
| project_card |  converted   |

## Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/1natsu172/github-action-auto-card-assign/tags). 

## ©️ License

MIT © [1natsu172](https://github.com/1natsu172)


---

## For developer

### Versioning

The presence or absence of the `v` prefix is ​​intentional.

`v1 = "^1.0.0"`
`1.0.0 = "1.0.0"`

Whenever release, must release the new version(non-v-prefix) and major version release(has-v-prefix).

ref: https://github.com/actions/toolkit/blob/master/docs/action-versioning.md

### After new release branch merged

#### Release new specific version

Release by GUI operation according to the official publishing-action guide.

https://help.github.com/ja/actions/building-actions/publishing-actions-in-github-marketplace#publishing-an-action

Be careful: specific version release tag is `non-v-prefix`

#### Update major version tag

And then, update existing major version tag by local push.

```bash
git checkout master
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```