/**
 * Initial state of connection
 * @memberof NetworkReducer
 */
const initialState = {
  isConnected: false
}

/**
 *
 * NetworkReducer
 * @param {*} [state=initialState]
 * @param {Type of action} action
 * @class NetworkReducer
 * @returns Action type and data
 */
const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected
      })
    default:
      return state
  }
}

export default NetworkReducer
