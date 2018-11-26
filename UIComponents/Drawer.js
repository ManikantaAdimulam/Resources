import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import DrawerLayout from 'react-native-drawer-layout'
import SideMenu from '../Modules/SideMenu/SideMenu'

const { width } = Dimensions.get('screen')

/**
 *
 *
 * @class Drawer
 * @extends {Component}
 */
class Drawer extends Component {
  /**
   *Creates an instance of Drawer.
   * @param {*} props
   * @memberof Drawer
   */
  constructor(props) {
    super(props)
    this.renderSideMenu = this.renderSideMenu.bind(this)
    this.openSideMenu = this.openSideMenu.bind(this)
    this.closeSideMenu = this.closeSideMenu.bind(this)
  }

  /**
   * Rendering SideMenu component.
   * @memberof Drawer
   */
  renderSideMenu = () => {
    return <SideMenu />
  }

  /**
   * Creating side menu reference
   *
   * @param {Side menu reference} ref
   * @memberof Drawer
   */
  sideMenuRef = (ref) => {
    this.sideMenu = ref
  }

  /**
   * To open side menu
   *
   * @memberof Drawer
   */
  openSideMenu = () => {
    this.sideMenu.openDrawer()
  }

  /**
   * To close side menu
   *
   * @memberof Drawer
   */
  closeSideMenu = () => {
    this.sideMenu.closeDrawer()
  }

  /**
   * Creating side menu wrapper
   *
   * @returns UI
   * @memberof Drawer
   */
  render() {
    return (
      <DrawerLayout
        drawerWidth={width * 0.65}
        renderNavigationView={this.renderSideMenu}
        drawerBackgroundColor="#fff"
        ref={this.sideMenuRef}
      >
        {this.props.children}
      </DrawerLayout>
    )
  }
}
export default Drawer
