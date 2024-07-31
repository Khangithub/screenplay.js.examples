import { Actor } from '@cucumber/screenplay'
import World from '../../World'
import * as constant from '../../../../constants/portal_constants'
import { to_string } from '../../../../libs/string'
import { typeMessage } from '../dom/interactions/typeMessage'
import { getElement } from '../dom/interactions/getElement'

export const login = (portal: string, role: string) => {
  console.log('Logging in as:', portal, role)
  return async (actor: Actor<World> & { username: string; password: string }) => {
    // handle login here
    const test_environment = process.env.TEST_ENVIRONMENT.toUpperCase()
    let url = 'https://parxl.com'
    console.log('test_environment:', test_environment)
    console.log('role:', role)
    console.log('portal:', portal)

    switch (portal) {
      case 'merchant': {
        switch (test_environment) {
          case 'DEV':
            url = constant.MERCHANT_PORTAL_DEV_URL
            break
          case 'UAT':
            url = constant.MERCHANT_PORTAL_UAT_URL
            break
          case 'STG':
            url = constant.MERCHANT_PORTAL_STG_URL
            break
          case 'PRD':
            url = constant.MERCHANT_PORTAL_PRD_URL
            break
          default:
            break
        }

        if (role === 'QA_HKG') {
          actor.username = to_string(process.env.MERCHANT_QA_HKG_USERNAME)
          actor.password = to_string(process.env.MERCHANT_QA_HKG_PASSWORD)
        }

        break
      }

      default:
        return 'pending'
    }

    console.log('url:', url)

    switch (portal) {
      case 'merchant': {
        // Login
        await typeMessage(actor)
        // Check if the user is logged in
        await getElement(
          '#root > div > div.StyledMainBody-sc-1u7g3ce.ikVqHF > div > div.StyledHeaderBar-sc-12gq7vk.fiVEhN > div.StyledUserItem-sc-19zfdyb.hggbTg > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2)',
          actor.username
        )
        break
      }
      default: {
      }
    }
  }
}