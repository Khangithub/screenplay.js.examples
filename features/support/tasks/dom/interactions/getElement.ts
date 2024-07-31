import { Actor, eventually } from '@cucumber/screenplay'
import World from '../../../World'
import { getByText } from '@testing-library/dom'
import { DomUser } from '../../../helpers/getDomUser'
import assert from 'assert'

export const getElement = (selector: string, expectedString: string) => {
  return async (actor: Actor<World>) => {
    const { element, user } = actor.recall<DomUser>('domUser')
    const comparedString = getByText(element, selector)
    await eventually(() => assert.deepStrictEqual(comparedString, expectedString))
  }
}
