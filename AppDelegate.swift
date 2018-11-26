
import UIKit
import React
import Fabric
import Crashlytics

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    var reactRootView: RCTRootView!
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        var jsCodeLocation: URL?
        #if DEBUG
        jsCodeLocation = URL(string: "http://192.168.1.225:8081/index.bundle?platform=ios")
        #else
        jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
        #endif
        let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "name", initialProperties: nil, launchOptions: launchOptions)
        let allPngImageNames = Bundle.main.paths(forResourcesOfType: "png", inDirectory: nil)
        for imgName: String in allPngImageNames {
            if imgName.contains("LaunchImage") {
                let img = UIImage(named: imgName)
                if img?.scale == UIScreen.main.scale && (img?.size.equalTo(UIScreen.main.bounds.size))! {
                    if let anImg = img {
                        rootView?.backgroundColor = UIColor(patternImage: anImg)
                    }
                }
            }
        }
        UIApplication.shared.isStatusBarHidden = true
        self.window = UIWindow(frame: UIScreen.main.bounds)
        let rootViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "ReactBaseVC") as? ReactBaseVC
        rootViewController?.view = rootView
        self.window?.rootViewController = rootViewController
        self.window?.makeKeyAndVisible()
        Fabric.with([Crashlytics.self])
        return true
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }
    
    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    
}

