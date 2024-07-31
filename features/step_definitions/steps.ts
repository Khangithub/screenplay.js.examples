import { Given, When, Then } from '@cucumber/cucumber'
import { Actor, eventually } from '@cucumber/screenplay'

import World from '../support/World'
import { Message } from '../../src/types'

Given('{actor} logs in {portal} portal as {role}', async function (this: World, actor: Actor<World>, portal: string, role: string) {
  console.log('Logging in as:', actor, portal, role);
  const userId = await actor.attemptsTo(this.login('merchant', 'QA'));
})


When('{actor} shouts {string}', async function (this: World, shouter: Actor, message: Message) {
 // await shouter.attemptsTo(this.shout(message))
 // shouter.remember('lastMessage', message)
})
