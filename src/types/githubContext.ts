import {context} from '@actions/github'
import {context as contextFixture} from '../fixtures/context.json'
import {Merge} from 'type-fest'

export type GitHubContext = Merge<typeof context, typeof contextFixture>
