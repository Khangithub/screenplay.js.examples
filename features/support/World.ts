import { setWorldConstructor, Before, After, defineParameterType } from '@cucumber/cucumber'
import { AppElements } from '@cucumber/electron'
import { ActorWorld, ActorParameterType } from '@cucumber/screenplay'

import Shouty from '../../src/Shouty'
import { makeApp } from '../../src/server'
import { promisify } from 'util'
import { InboxMessages, Shout, StartSession } from './tasks/types'

defineParameterType({ ...ActorParameterType })
defineParameterType({
  name: 'coordinate',
  regexp: /\(\s*(\d+),\s*(\d+)\s*\)/,
  transformer(x: string, y: string) {
    return { x: +x, y: +y }
  },
})

type Stop = () => Promise<void>

export default class World extends ActorWorld {
  public readonly stops: Stop[] = []
  public readonly shouty = new Shouty()
  public readonly apiPort = 8087

  public readonly appElements = new AppElements()

  // Tasks
  public startSession: StartSession
  public shout: Shout
  public inboxMessages: InboxMessages
}

setWorldConstructor(World)

Before(async function (this: World) {
  if (!process.env.KEEP_DOM) {
    this.stops.push(async () => this.appElements.destroyAll())
  }

  if (this.parameters.sessions === 'HttpSession') {
    const app = makeApp(this.shouty)

    await new Promise<void>((resolve, reject) => {
      app.on('error', reject)

      const server = app.listen(this.apiPort, resolve)
      const stopServer = promisify(server.close.bind(server)) as Stop
      this.stops.push(stopServer)
    })
  }
})

After(async function (this: World) {
  await Promise.all(this.stops.reverse().map((stop) => stop()))
})
