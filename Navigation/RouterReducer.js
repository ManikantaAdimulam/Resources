import { ActionConst } from 'react-native-router-flux'

/**
 * Initial state of scenes
 * @memberof RouterReducer
 */
const initialState = {
  scene: []
}

/**
 *
 * RouterReducer
 * @export
 * @class RouterReducer
 * @param {*} [state=initialState]
 * @param {Type of action received} action
 * @returns Action type and data
 */
export function RouterReducer(state = initialState, action) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.data.routes
      }
    default:
      return state
  }
}
