import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Fonts, Colors } from '../Constants/Constants'
const { height, width } = Dimensions.get('window')

export const commonStyles = StyleSheet.create({
  titleText: {
    height: 32,
    fontSize: 24,
    color: Colors.primaryColor,
    fontFamily: Fonts.SFProTextBold,
    marginBottom: 6,
    marginLeft: 4,
    marginRight: 6
  },
  descriptionText: {
    fontFamily: Fonts.SFProTextRegular,
    fontSize: 18,
    color: Colors.headerDescriptionText,
    marginLeft: 4,
    marginRight: Platform.OS === 'ios' ? 15 : 15,
    paddingRight: Platform.OS === 'ios' ? 10 : 8
  },
  backImage: {
    height: height * 0.03,
    width: width * 0.05,
    marginTop: height * 0.05,
    marginLeft: 12,
    marginBottom: height * 0.03,
    resizeMode: 'contain'
  },
  navigationTitle: {
    marginTop: 15,
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    width: width - 40,
    fontFamily: Fonts.SFProTextSemibold,
    fontSize: 17,
    color: 'black'
  }
})
