import React, { Component } from 'react'
import {
  Scene,
  Router,
  Stack,
  Reducer,
  ActionConst
} from 'react-native-router-flux'
import { connect } from 'react-redux'
import {
  InteractionManager,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native'
import Login from '../Modules/LogIn/LogIn'
import DashBoard from '../Modules/DashBoard/DashBoard'
import SlipsList from '../Modules/CoinCollection/SlipsList/SlipsListing'
// import SideMenu from '../Modules/SideMenu/SideMenu'
import ForgotPassword from '../Modules/ForgotPassword/ForgotPassword'
import SlipDetails from '../Modules/CoinCollection/SlipDetails/SlipDetails'
import AddNewMachine from '../Modules/CoinCollection/AddNewMachine/AddNewMachine'
import SelectMachineReason from '../Modules/CoinCollection/Reason/SelectMachineReason'
import SelectSlipReason from '../Modules/CoinCollection/Reason/SelectSlipReason'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import MachineDetails from '../Modules/CoinCollection/MachineDetails/MachineDetails'
import DocViewer from '../Modules/CounterReadingGuide/DocViewer'
import EnterSiteId from '../Modules/InventoryAndAudit/SiteId/EnterSiteId'
import {
  insertData,
  setUser
} from '../ReduxClasses/ActionCreators/InitialActionCreators'
import AddNewSlip from '../Modules/CoinCollection/AddNewSlip/AddNewSlip'
import { isIphoneX } from '../Constants/Constants'
import Cart from '../Modules/InventoryAndAudit/Cart/Cart'
import AddInventory from '../Modules/InventoryAndAudit/AddInventory/AddInventory'
import SearchInventory from '../Modules/InventoryAndAudit/SearchInventory/SearchInventory'
import PartDetails from '../Modules/InventoryAndAudit/PartDetails/PartDetails'
import BinList from '../Modules/InventoryAndAudit/BinList/BinList'
import CreateBinLocation from '../Modules/InventoryAndAudit/BinLocation/CreateBinLocation'
// Creating reducer from react-native-router-flux
const defaultReducer = new Reducer()

/**
 * @class Navigation
 * @extends {Component}
 */
class Navigation extends Component {
  /**
   *Creates an instance of Navigation.
   * @param {Class props} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props)
    this.scenes = this.scenes.bind(this)
    this.setUserData()
  }

  /**
   * @flow
   * LifeCycle method
   * @returns {Boolean}
   * @memberof Navigation
   */
  shouldComponentUpdate() {
    return false
  }
  /**
   * To set user data into reducer.
   * @memberof Navigation
   */
  async setUserData() {
    await AsyncStorage.getItem('login').then((data) => {
      const { dispatch } = this.props
      dispatch(setUser('LOGIN_DATA', JSON.parse(data)))
    })
  }

  /**
   * Scene change actions with router flux reducer
   * @returns reducer data
   * @memberof Navigation
   */
  scenes = () => {
    const { dispatch } = this.props
    return (state, action) => {
      if (action.type === ActionConst.FOCUS) {
        InteractionManager.runAfterInteractions(() => {
          dispatch(insertData(action.type, state))
        })
      }
      return defaultReducer(state, action)
    }
  }
  /**
   * Android navigation style
   * @memberof Navigation
   */
  androidInterpolator = () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })

  /**
   * Setting safe area navigation bar styles.
   *
   * @memberof Navigation
   */
  safeAreaNavBarStyles = () => ({
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  })

  /**
   * All screens in the application.
   *
   * @memberof Navigation
   */
  screensStack = () => {
    return (
      <Router
        createReducer={this.scenes}
        hideNavBar={true}
        showNavigationBar={false}
        getSceneStyle={this.safeAreaNavBarStyles}
      >
        <Stack
          key="root"
          navTransparent
          transitionConfig={this.androidInterpolator}
          navigationBarStyle={styles.navbar}
        >
          <Scene
            title={'Login'}
            component={Login}
            key="login"
            hideNavBar
            initial={this.props.value === '1' ? false : true}
          />
          <Scene
            title={''}
            component={ForgotPassword}
            key="forgotPassword"
            hideNavBar
          />
          <Scene
            title={''}
            component={DashBoard}
            key="dashboard"
            gesturesEnabled={false}
            hideNavBar
            navigationBarStyle={styles.navbar}
            initial={this.props.value === '1' ? true : false}
          />
          {/* CoinCollection screens*/}
          <Scene
            title={''}
            component={SlipDetails}
            key="slipDetails"
            hideNavBar={true}
          />
          <Scene title={''} component={AddNewSlip} key="addNewSlip" />
          <Scene
            title={'Add New Machine'}
            component={AddNewMachine}
            key="addNewMachine"
            hideNavBar
          />
          <Scene
            title={'Select Reason'}
            component={SelectMachineReason}
            key="selectMachineReason"
            hideNavBar
          />
          <Scene
            title={''}
            component={SelectSlipReason}
            key="selectSlipReason"
            hideNavBar
          />
          <Scene
            title={'MachineDetails'}
            component={MachineDetails}
            key="machineDetails"
            hideNavBar
          />
          <Scene
            title={'SlipsList'}
            component={SlipsList}
            key="slipsList"
            hideNavBar
          />
          <Scene
            title={'Counter Reading Guide'}
            component={DocViewer}
            key="docViewer"
            hideNavBar
          />
          {/** Inventory screens*/}
          <Scene
            title={'Enter Site Id'}
            component={EnterSiteId}
            key="enterSiteId"
            hideNavBar
          />

          <Scene
            title={'Cart Details'}
            component={Cart}
            key="cart"
            hideNavBar
          />
          <Scene
            title={'Inventory'}
            component={AddInventory}
            key="addInventory"
            hideNavBar
          />
          <Scene
            title={''}
            component={SearchInventory}
            key="searchInventory"
            hideNavBar
          />
          <Scene
            title={'PartDetails'}
            component={PartDetails}
            key="partDetails"
            hideNavBar
          />
          <Scene title={''} component={BinList} key="binList" hideNavBar />
          <Scene
            title={''}
            component={CreateBinLocation}
            key="createBinLocation"
            hideNavBar
          />
        </Stack>
      </Router>
    )
  }

  /**
   * Render
   * @returns {UI}
   * @memberof Navigation
   */
  render() {
    if (isIphoneX) {
      return (
        <SafeAreaView style={styles.safeArea} forceInset={{ bottom: 'never' }}>
          {this.screensStack()}
        </SafeAreaView>
      )
    } else {
      return this.screensStack()
    }
  }
}
// @flow
/**
 * This function is useful for mapping redux state to our props.
 *
 * @param {Redux function} state
 * @memberof Navigation
 */
const mapStateToProps = (state) => ({
  data: state.RouterReducer
})
// @flow
/**
 * To store screens array in Redux store
 *
 * @param {Type of navigation action from ActionConst} action
 * @param {Screens array} data
 * @memberof Navigation
 */

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0,
    elevation: 0
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default connect(mapStateToProps)(Navigation)
