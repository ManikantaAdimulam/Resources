/**
 * Get user current location
 *  @memberof CommonMethods
 */
export const geoLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords)
      },
      (error) => {
        reject(error)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
    )
  })
}


