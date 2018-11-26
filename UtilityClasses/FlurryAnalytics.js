import { NativeModules } from 'react-native'

const { RNFlurryAnalytics } = NativeModules

let startSessionIsCalled = false

const mustCalledPriorStartSession = (methodName) => {
  console.error(
    `FlurryAnalytics.${methodName}: method must be called prior to invoking "startSession"`
  )
}

/**
 *
 * @export
 * @class FlurryAnalytics
 */
export default class FlurryAnalytics {
  /**
   * To start start session
   *
   * @static
   * @param {Flurry API Key} apiKey
   * @memberof FlurryAnalytics
   */
  static startSession(apiKey) {
    if (startSessionIsCalled) {
      console.error('FlurryAnalytics.startSession: already called')
      return
    }

    if (!apiKey) {
      console.error('FlurryAnalytics.startSession: apiKey(string) is required')
      return
    }

    RNFlurryAnalytics.startSession(apiKey)

    startSessionIsCalled = true
  }

  /**
   * To setup app version
   *
   * @static
   * @param {Application version} version
   * @memberof FlurryAnalytics
   */
  static setAppVersion(version) {
    if (startSessionIsCalled) {
      mustCalledPriorStartSession('setAppVersion')
      return
    }

    RNFlurryAnalytics.setAppVersion(version)
  }

  /**
   *
   *
   * @static
   * @param {boolean} [enabled=false]
   * @memberof FlurryAnalytics
   */
  static setDebugLogEnabled(enabled = false) {
    if (startSessionIsCalled) {
      mustCalledPriorStartSession('setDebugLogEnabled')
      return
    }

    RNFlurryAnalytics.setDebugLogEnabled(enabled)
  }

  /**
   * Setup session continue seconds
   *
   * @static
   * @param {number} [seconds=10]
   * @memberof FlurryAnalytics
   */
  static setSessionContinueSeconds(seconds = 10) {
    if (startSessionIsCalled) {
      mustCalledPriorStartSession('setSessionContinueSeconds')
      return
    }
    if (seconds < 5) {
      console.error(
        'FlurryAnalytics.setSessionContinueSeconds: the minimum timeout for a session is 5 seconds'
      )
    }

    RNFlurryAnalytics.setSessionContinueSeconds(seconds)
  }

  /**
   * Setting up crash reporting tool
   *
   * @static
   * @param {boolean} [enabled=false]
   * @memberof FlurryAnalytics
   */
  static setCrashReportingEnabled(enabled = false) {
    if (startSessionIsCalled) {
      mustCalledPriorStartSession('setCrashReportingEnabled')
      return
    }

    RNFlurryAnalytics.setCrashReportingEnabled(enabled)
  }

  /**
   *
   * There are three overloads
   *
   * - logEvent(eventName)
   * - logEvent(eventName, timed)
   * - logEvent(eventName, params, timed)
   * @static
   * @param {Event name} eventName
   * @param {Event parameters} params
   * @param {Time} timed
   * @memberof FlurryAnalytics
   */
  static logEvent(eventName, params, timed) {
    if (!eventName || typeof eventName !== 'string') {
      return
    }

    if (arguments.length === 1) {
      RNFlurryAnalytics.logEvent(eventName, false)
    }

    if (arguments.length === 2) {
      if (typeof arguments[1] === 'boolean') {
        RNFlurryAnalytics.logEvent(eventName, arguments[1])
      }

      if (Object.prototype.toString.call(arguments[1]).includes('Object')) {
        RNFlurryAnalytics.logEventWithParameters(eventName, arguments[1], false)
      }
    }

    if (arguments.length === 3) {
      RNFlurryAnalytics.logEventWithParameters(eventName, params, timed)
    }
  }

  /**
   * Setup end time event
   *
   * @static
   * @param {Event name} eventName
   * @param {Parameters (default null)} [params=null]
   * @memberof FlurryAnalytics
   */
  static endTimedEvent(eventName, params = null) {
    if (!eventName || typeof eventName !== 'string') {
      return
    }

    RNFlurryAnalytics.endTimedEvent(eventName, params)
  }

  /**
   * Logging page visit count
   *
   * @static
   * @memberof FlurryAnalytics
   */
  static logPageView() {
    RNFlurryAnalytics.logPageView()
  }

  /**
   * Setting up User ID
   *
   * @static
   * @param {*} userId
   * @memberof FlurryAnalytics
   */
  static setUserId(userId) {
    if (!userId || typeof userId !== 'string') {
      return
    }

    RNFlurryAnalytics.setUserID(userId)
  }

  /**
   * Set up use age
   *
   * @static
   * @param {Age} age
   * @memberof FlurryAnalytics
   */
  static setUserAge(age) {
    if (!age || typeof age !== 'number' || age <= 0) {
      console.error(
        `FlurryAnalytics.setUserAge: age must be a valid positive number. Got ${age}`
      )
      return
    }

    RNFlurryAnalytics.setUserAge(age)
  }

  /**
   * Set up user gender
   *
   * @static
   * @param {*} gender
   * @memberof FlurryAnalytics
   */
  static setUserGender(gender) {
    if (!gender || typeof gender !== 'string' || !['m', 'f'].includes(gender)) {
      console.error(
        `FlurryAnalytics.setUserGender: gender must be on of ['m', 'f']. Got ${gender}`
      )
      return
    }

    RNFlurryAnalytics.setUserGender(gender)
  }

  /**
   * Mock method to check objects
   *
   * @static
   * @memberof FlurryAnalytics
   */
  static mock() {
    const methods = Object.getOwnPropertyNames(FlurryAnalytics)

    const mockMethod = (methodName) => (...args) =>
      console.log(`FlurryAnalytics.${methodName}`, ...args)

    methods.forEach((methodName) => {
      if (typeof FlurryAnalytics[methodName] === 'function') {
        FlurryAnalytics[methodName] = mockMethod(methodName)
      }
    })
  }
}
