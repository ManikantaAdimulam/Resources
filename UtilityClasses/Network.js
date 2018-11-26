import React, { Component } from 'react'
import {
  View,
  NetInfo,
  StyleSheet,
  Text,
  Dimensions,
  DeviceEventEmitter,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { connectionState } from '../ReduxClasses/Actions/NetActions'
import {
  syncDataWithServer,
  setUserEmailTo
} from '../Database/BackgroundDataSync'
import { Colors, Fonts } from '../Constants/Constants'
import * as Animatable from 'react-native-animatable'

const { width } = Dimensions.get('window')

/**
 * @class Network
 * @extends {Component}
 */
class Network extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      isSyncing: false
    }
  }
  /**
   * componentDidMount
   * Life cycle method
   * Using for receiving network connection status and changes.
   * Data base syncing process
   * @memberof Network
   */
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange
    )
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (this.state.isConnected != isConnected) {
        this.setState({ isConnected })
      }
      const { dispatch } = this.props
      dispatch(connectionState({ status: isConnected }))
    })
    DeviceEventEmitter.addListener('isSyncingData', (e) => {
      if (e.isSyncingData != this.state.isSyncing) {
        this.setState({ isSyncing: e.isSyncingData }, () => {
          if (!this.state.isSyncing) {
            DeviceEventEmitter.emit('updateList', { update: true })
            DeviceEventEmitter.emit('updateUI', { update: true })
          }
        })
      }
    })
    setUserEmailTo(this.props.userData.user.uniqueName)
  }

  /**
   * componentWillUnmount
   * Life cycle method
   * Using for stop listing network changes and UI updates.
   * @memberof Network
   */
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('isSyncingData', () => {})
    DeviceEventEmitter.removeListener('updateUI', () => {})
    DeviceEventEmitter.removeListener('updateList', () => {})
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    )
  }

  /**
   * Handling connection changes while listing
   * @param {Bool value for connection status} isConnected
   * @memberof Network
   */
  handleConnectionChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected: true })
    } else {
      this.setState({ isConnected: false })
    }
    if (this.state.isConnected) {
      syncDataWithServer()
    }
    const { dispatch } = this.props
    dispatch(connectionState({ status: isConnected }))
  }

  render() {
    if (!this.state.isConnected) {
      return (
        <Animatable.View
          style={styles.offlineContainer}
          animation="slideInDown"
        >
          <Text style={styles.textColor}>NO INTERNET CONNECTION</Text>
        </Animatable.View>
      )
    } else {
      if (this.state.isSyncing && this.state.isConnected) {
        return (
          <Animatable.View style={styles.syncContainer} animation="slideInDown">
            <Text style={styles.textColor}>DATA SYNCING TO SERVER</Text>
          </Animatable.View>
        )
      } else {
        return <View />
      }
    }
  }
}

/**
 *
 * @param {Redux state} state
 * @memberof Network
 */
const mapStateToProps = (state) => ({
  userData: state.UserReducer
})

export default connect(mapStateToProps)(Network)

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: Colors.notCaptured,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
    zIndex: 50
  },
  textColor: {
    color: '#fff',
    fontFamily: Fonts.SFProTextMedium
  },
  // onlineContainer: {
  //   backgroundColor: Colors.done,
  //   height: 40,
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   width,
  //   position: 'absolute',
  //   top: 0,
  //   zIndex: 50,
  //   paddingTop: 20
  // },
  syncContainer: {
    backgroundColor: Colors.placeholderColor,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
    zIndex: 50
  }
})
