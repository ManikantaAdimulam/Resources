import React, { Component } from 'react'
import { Modal, Dimensions, StyleSheet } from 'react-native'
import { View, Spinner } from 'native-base'
import { Colors } from '../../Constants/Constants'

const { height, width } = Dimensions.get('screen')

/**
 *
 * @export
 * @class Loader
 * @extends {Component}
 */
export default class Loader extends Component {
  /**
   * Creates an instance of Loader.
   * @param {Class props} props
   * @memberof Loader
   */
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.onShow = this.onShow.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
  }
  /**
   * Show modal sheet
   * @memberof Loader
   */
  onShow = () => {
    this.setState({ show: true })
  }
  /**
   * Show modal sheet
   * @memberof Loader
   */
  onDismiss = () => {
    this.setState({ show: false })
  }
  /**
   * Close request android specific
   * @memberof Loader
   */
  onRequestClose = () => {
    // Error handling
  }
  /**
   *
   * UI
   * @returns
   * @memberof Loader
   */
  //this.props.trans === undefined ? true : false
  render() {
    const { visible, ...attributes } = this.props
    return (
      <Modal
        navigationBarHidden={true}
        animationType={'none'}
        transparent={true}
        visible={visible}
        onShow={this.onShow}
        onDismiss={this.onDismiss}
        onRequestClose={this.onRequestClose}
      >
        <View navigationBarHidden={true} style={styles.modal}>
          {this.props.visible && <Spinner color={Colors.primaryColor} />}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    width,
    height,
    backgroundColor: '#00000020',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
