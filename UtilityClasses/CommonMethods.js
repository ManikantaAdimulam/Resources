import { Actions } from 'react-native-router-flux'
/**
 * Common Methods
 * @class CommonMethods
 */
export const CommonMethods = {
  /**
   * Navigation method
   * @param {Set of screens from reducer } scenes
   * @param { Key for screen to navigate } name
   * @memberof CommonMethods
   * @description Checking availability of screen from the available screen before navigating,
                  To manage navigation in proper way
   */
  navigateTo: (scenes, key,props) => {
    let found = false
    if (scenes.length > 0) {
      scenes.forEach((scene) => {
        if (scene.routeName === key) {
          found = true
        }
      })
    }
    if (!found) {
      Actions.push(key,props)
    } else {
      Actions.popTo(key,props)
    }
  }
}