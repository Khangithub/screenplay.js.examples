import { Actor } from '@cucumber/screenplay'
import World from '../../../World'
import { getByLabelText } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { TypeMessage } from './types'
import { DomUser } from '../../../helpers/getDomUser'

export const typeMessage: TypeMessage = (actor: Actor<World> & {username: string, password: string}) => {
  return async (actor: Actor<World> & {username: string, password: string}) => {
    const { element } = actor.recall<DomUser>('domUser')
    const { username, password} = actor;

    // type username
    const $usernameLocation = getByLabelText(element, `username`)
    userEvent.type($usernameLocation, username)

    // type password
    const $passwordLocation = getByLabelText(element, `password`)
    userEvent.type($passwordLocation, password)
  }
}
