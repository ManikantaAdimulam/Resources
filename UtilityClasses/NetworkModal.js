import { NetworkManager } from '../Network/NetworkManager'

/**
 * @class NetworkModal
 */
/**
 * API Request method
 * This method is an intermediate method for dispatching APIActions
 * @param {API} url
 * @param {HTTP Method} httpMethod
 * @param {Parameters} parameters
 * @memberof NetworkModal
 */
export const NetworkModal = {
  requestStatus: (url, httpMethod, parameters) => {
    return NetworkManager.request(url, httpMethod, parameters).then((response) => {
      return response
    })
  }
}
