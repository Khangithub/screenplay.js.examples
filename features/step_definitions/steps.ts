import { Given } from '@cucumber/cucumber'
import { Actor } from '@cucumber/screenplay'

import World from '../support/World'

Given('{actor} logs in {portal} portal as {role}', async function (this: World, actor: Actor<World>, portal: string, role: string) {
  await actor.attemptsTo(this.login(portal, role));
})