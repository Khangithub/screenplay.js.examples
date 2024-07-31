import { Action, Actor, PromiseAction } from '@cucumber/screenplay'
import { Message } from '../../../../../src/types'
import World from '../../../World'

export type ClickShoutButton = () => PromiseAction
export type TypeMessage = (actor: Actor<World> & {username: string, password: string}) => Action
