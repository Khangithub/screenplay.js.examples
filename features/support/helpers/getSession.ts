import { Actor } from '@cucumber/screenplay'
import World from '../World'
import { Session } from '../../../src/types'
import HttpSession from '../../../src/HttpSession'
import NodeEventSource from 'eventsource'

export default function getSession(actor: Actor<World>): Session {
  return actor.recall('session', () => {
    const shoutySession = actor.world.shouty.makeSession(actor.name)

    // Make sure we stop the session at the end of each scenario
    actor.world.stops.push(() => shoutySession.stop())

    if (actor.world.parameters.sessions === 'HttpSession') {
      const httpSession = new HttpSession(
        shoutySession.userId,
        new URL(`http://localhost:${actor.world.apiPort}`),
        (url) => new NodeEventSource(url) as EventSource
      )
      // Make sure we stop the session at the end of each scenario
      actor.world.stops.push(() => httpSession.stop())
      return httpSession
    } else {
      return shoutySession
    }
  })
}
