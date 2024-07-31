import { setWorldConstructor, Before, After, defineParameterType } from '@cucumber/cucumber'
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

  constructor() {
    super({} as any);
    this.login = async (username: string, role: string) => {
      // Implement your login logic here
      console.log(`Logging in with username: ${username}, role: ${role}`);
      // Simulate login process
      return Promise.resolve();
    };
  }
}

setWorldConstructor(World)

Before(async function (this: World) {
 
})

After(async function (this: World) {
})
