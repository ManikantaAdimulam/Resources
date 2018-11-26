import React from 'react'
import {
  TextInput,
  View,
  Animated,
  Platform,
  PixelRatio,
  InteractionManager
} from 'react-native'
import { Fonts, Colors } from '../Constants/Constants'
/**
 * @class FloatingLabelInput
 * @extends {React.Component}
 */
class FloatingLabelInput extends React.PureComponent {
  /**
   * Creates an instance of FloatingLabelInput.
   * @param {*} props
   * @memberof FloatingLabelInput
   */
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
      starting: true
    }
    this._animatedIsFocused = new Animated.Value(0)
    this.onChangeText = this.onChangeText.bind(this)
    this.onEndEditing = this.onEndEditing.bind(this)
    this.onLayout = this.onLayout.bind(this)
  }

  /**
   *
   * Life cycle methods
   * @returns Bool
   * @memberof FloatingLabelInput
   */
  getSnapshotBeforeUpdate() {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.value !== '' && this.state.isFocused === false) {
        this.setState({ isFocused: true })
      }
    })
    return true
  }
  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200
    }).start()
  }
  handleFocus = () => {
    this.setState({ isFocused: true })
  }
  /**
   * Checking changes in textinput.
   *
   * @memberof FloatingLabelInput
   */
  onLayout = () => {
    if (this.props.value != '' && this.state.isFocused != true) {
      this.setState({ isFocused: true })
    } else {
      if (this.props.value === '' && this.state.isFocused != true) {
        this.setState({ isFocused: false })
      }
    }
  }
  /**
   * To observe changes in text
   *
   * @param {textinput text} text
   * @memberof FloatingLabelInput
   */
  onChangeText(text) {
    if (text !== null) {
      this.props.onChangeText(text)
    }
  }
  /**
   *
   *
   * @param {Native event text} text
   * @memberof FloatingLabelInput
   */
  onEndEditing(text) {
    if (text.nativeEvent !== null) {
      if (text.nativeEvent.text !== '') {
        this.setState({ isFocused: true })
      } else {
        this.setState({ isFocused: false })
      }
      this.props.onChangeText(text.nativeEvent.text)
    }
  }
  /**
   *
   * To get dynamic style values for text input based on Platform
   * @returns Text input styles
   * @memberof FloatingLabelInput
   */
  getTextFieldStyles() {
    return {
      height: Platform.OS === 'ios' ? 28 : PixelRatio.roundToNearestPixel(42),
      fontSize: PixelRatio.roundToNearestPixel(20),
      color: Colors.inputColor,
      fontFamily: Fonts.SFProTextBold,
      bottom: Platform.OS === 'ios' ? 0 : -5,
      left: Platform.OS === 'ios' ? 0 : -3,
      padding: Platform.OS === 'android' ? 3 : null,
      margin: Platform.OS === 'android' ? 0 : null,
      borderWidth: Platform.OS === 'android' ? 0 : null
    }
  }
  /**
   * To get dynamic style values for base view of text input
   *
   * @returns Textinput view styles
   * @memberof FloatingLabelInput
   */
  getMainViewStyles() {
    return {
      paddingTop: Platform.OS === 'ios' ? 20 : 18,
      margin: Platform.OS === 'ios' ? 10 : 5,
      borderBottomWidth: 1,
      borderColor: this.state.isFocused
        ? Colors.inputColor
        : Colors.placeholderColor
    }
  }

  /**
   * UI
   * @returns JSX
   * @memberof FloatingLabelInput
   */
  render() {
    const { label, ...props } = this.props
    const labelStyle = {
      position: 'absolute',
      left: -1,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [Platform.OS === 'ios' ? 22 : 28, 0]
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 16]
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.placeholderColor, Colors.inputColor]
      }),
      fontFamily: Fonts.SFProTextMedium,
      padding: 0
    }
    return (
      <View style={this.getMainViewStyles()}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          {...props}
          style={this.getTextFieldStyles()}
          onFocus={this.handleFocus}
          onChangeText={this.onChangeText}
          onEndEditing={this.onEndEditing}
          multiline={false}
          underlineColorAndroid="transparent"
          ref={this.props.reference}
          onContentSizeChange={this.onLayout}
        />
      </View>
    )
  }
}

export default FloatingLabelInput
