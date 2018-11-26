import { PixelRatio, Dimensions } from 'react-native'

/**
 * To get Device dimensions
 * @class UINormalize
 */
const { height, width } = Dimensions.get('window')
/**
 * To get device pixel ratio
 * @memberof UINormalize
 */
const pixelRatio = PixelRatio.get()

/**
 * To get size based on device pixel ratio
 *
 * @memberof UINormalize
 * @param {Size required} size
 */
export const normalize = (size) => {
  switch (true) {
    case pixelRatio < 1.4:
      return size * 0.8
    case pixelRatio < 2.4:
      return size * 1.25
    case pixelRatio < 3.4:
      return size * 1.35
    default:
      return size * 1.5
  }
}

/**
 *
 * To calculate font size
 * @param {Required font size} size
 * @returns Normalized value
 * @memberof UINormalize
 */
export const normalizeFont = (size) => {
  if (pixelRatio < 1.4) {
    return Math.sqrt(height * height + width * width) * (size / 175)
  }
  return Math.sqrt(height * height + width * width) * (size / 100)
}
