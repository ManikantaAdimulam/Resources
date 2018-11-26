//
//  ReactNativeModule.swift
//  ReactNativeWithNativeDemo
//
//  Created by manikanta on 12/30/17.
//  Copyright © 2017 Credencys. All rights reserved.
//

import UIKit
import React
import Foundation

/// This class useful for react-native bridging
///
class ReactNativeModule: NSObject {
    /// Shared instance for react module
    static let sharedInstance = ReactNativeModule()
    
    ///
    private override init() {
        print("ReactNativeModule initialized")
    }
    
    ///
    deinit {
        print("ReactNativeModule deinit")
    }
    
    /// Bridge object to handle callbacks and data passing between React and Native.
    var bridge: RCTBridge?
    
    /// Creating bridge
    func createBridgeIfNeeded() -> RCTBridge {
        if bridge == nil {
            bridge = RCTBridge.init(delegate: self, launchOptions: nil)
        }
        return bridge!
    }
    
    /// Returns view for module with the same name as specified in React.
    /// - Parameters:
    ///   - moduleName: Name of the module used in react.
    ///   - initialProperties: Props to be set from native code which are used in react-native view.
    /// - Returns: Object of react view.
    func viewForModule(_ moduleName: String, initialProperties: [String: Any]?) -> RCTRootView {
        let viewBridge = createBridgeIfNeeded()
        #if RCT_DEV
        viewBridge.module(forClass: RCTDevLoadingView.self)
        #endif
        let rootView: RCTRootView = RCTRootView(
            bridge: viewBridge,
            moduleName: moduleName,
            initialProperties: initialProperties)
        return rootView
    }
}


// MARK: - RCTBridge delegate
///
extension ReactNativeModule: RCTBridgeDelegate {
    // MARK: RCTBridge delegate
    /// Returns the source URL to be used for main bundle.
    /// JS SourceCode url
    ///
    /// - Parameter bridge: Bridge between native and react-native
    /// - Returns: React-native Sourcecode bundle URL
    ///     - Release
    ///     if react-native-code-push implemented
    ///        URL: CodePush.bundleURL()
    ///     if not implemented react-native-code-push
    ///        URL: Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    ///     - Debug
    ///         URL: (**SystemIP**/index.bundle?platform=ios)(Ex: http://192.168.1.216:8081/index.bundle?platform=ios)
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        #if DEBUG
        return URL(string: "http://192.168.11.176:8081/index.bundle?platform=ios")
        #else
        return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }
}


