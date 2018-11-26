//
//  ViewController.swift
//
//  Created by Sonam Maniar on 5/29/18.
//  Copyright © 2018 Sonam Maniar. All rights reserved.
//

import UIKit
import React
import React
class ReactBaseVC: UIViewController {
    // MARK: - Variables
    ///
    var reactRootView: RCTRootView!
    // MARK: - Lifecycle Methods
    ///
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
//        if reactRootView == nil && ReactNativeModule.sharedInstance.bridge == nil {
//            setupUI()
//        }
    }
    ///
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
//        reactRootView.removeFromSuperview()
//        reactRootView = nil
//        ReactNativeModule.sharedInstance.bridge?.invalidate()
//        ReactNativeModule.sharedInstance.bridge = nil
    }
    // MARK: - UIMethods
    /// Setup UI for react screen. Decides which type of screen is to be loaded.
    func setupUI() {
        DispatchQueue.main.async {
            self.reactRootView = ReactNativeModule.sharedInstance.viewForModule("demo", initialProperties: ["screen": ""])
            self.reactRootView.frame = self.view.bounds
            self.view.addSubview(self.reactRootView)
        }
    }
}
