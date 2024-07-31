import { setWorldConstructor, defineParameterType } from '@cucumber/cucumber'
import { ActorWorld, ActorParameterType } from '@cucumber/screenplay'

defineParameterType({ ...ActorParameterType })
defineParameterType({
  name: 'portal',
  regexp: /merchant|lsp|pls/,
  transformer(s: string) {
    return s
  }
})
defineParameterType({
  name: 'role',
  regexp: /QA|DEV/,
  transformer(s: string) {
    return s
  }
})

export default class World extends ActorWorld {
  public login: (username: string, role: string) => any; // Define the type of login
}

setWorldConstructor(World)