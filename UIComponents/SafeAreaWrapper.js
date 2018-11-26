import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { isIphoneX } from '../Constants/Constants'

/**
 *  @class SafeAreaWrapper
 */

/**
 * This is wrapper based on device model. For
 * devices like iPhoneX, Which is having nautch display.
 * @param {props} props
 * @returns
 * @memberof SafeAreaWrapper
 */
const SafeAreaWrapper = (props) => {
  if (isIphoneX) {
    return <SafeAreaView style={styles.safeArea}>{props.children}</SafeAreaView>
  } else {
    return <View style={styles.normalView}>{props.children}</View>
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  normalView: {
    flex: 1
  }
})
export default SafeAreaWrapper
