import { create } from 'apisauce'
import { httpMethods } from '../Constants/Constants'
import { AsyncStorage } from 'react-native'
import { getUrl } from './Environment'
/**
 * @class NetworkManager
 */

const baseApi = create({
  baseURL: getUrl(global.moduleName),
  timeout: 30000
})

/**
 *
 * Creating access token
 * @param {Token} key
 * @memberof NetworkManager
 * @returns Access token
 */
const getAccessToken = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/**
 *
 * Set access token in local storage.
 * @param {Headers} headers
 * @memberof NetworkManager
 */
export const setAccessToken = (headers) => {
  let accessToken = ''
  let refreshAccessToken = ''
  if (
    headers['x-access-wash-token'] !== undefined &&
    headers['x-refresh-wash-token'] !== undefined
  ) {
    AsyncStorage.setItem('AccessToken', headers['x-access-wash-token'])
    AsyncStorage.setItem('RefreshAccessToken', headers['x-refresh-wash-token'])
  }

  getAccessToken('AccessToken').then((response) => {
    accessToken = response
  })
  getAccessToken('RefreshAccessToken').then((response) => {
    refreshAccessToken = response
    baseApi.setHeaders({
      'Content-Type': 'application/json',
      'x-access-wash-token': accessToken,
      'x-refresh-wash-token': refreshAccessToken
    })
    return true
  })
}
/**
 * Network callbacks
 *
 * @description  API requesting function
 * @memberof NetworkManager
 * @return  returns API Response
 */
// var accessToken = ''
export const NetworkManager = {
  request: (url, httpMethod, parameters) => {
    baseApi.setBaseURL(getUrl(global.moduleName))
    switch (httpMethod) {
      /// GET
      case httpMethods.get:
        return baseApi
          .get(url)
          .then((response) => {
            if (response.ok) {
              setAccessToken(response.headers)
            }
            return response
          })
          .catch((error) => {
            return error
          })
      /// POST
      case httpMethods.post:
        return baseApi
          .post(url, parameters)
          .then((response) => {
            if (response.ok) {
              setAccessToken(response.headers)
            }
            return response
          })
          .catch((error) => {
            return error
          })

      /// PUT
      case httpMethods.put:
        return baseApi
          .put(url, parameters)
          .then((response) => {
            setAccessToken(response.headers)
            return response
          })
          .catch((error) => {
            return error
          })
      /// DELETE
      case httpMethods.delete:
        return baseApi
          .delete(url, parameters)
          .then((response) => {
            setAccessToken(response.headers)
            return response
          })
          .catch((error) => {
            return error
          })
      default:
        return
    }
  }
}
