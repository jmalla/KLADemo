cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.NetworkInfoProxy",
    "file": "plugins/cordova-plugin-network-information/src/windows/NetworkInfoProxy.js",
    "pluginId": "cordova-plugin-network-information",
    "runs": true
  },
  {
    "id": "cordova-plugin-dialogs.notification",
    "file": "plugins/cordova-plugin-dialogs/www/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-dialogs.NotificationProxy",
    "file": "plugins/cordova-plugin-dialogs/src/windows/NotificationProxy.js",
    "pluginId": "cordova-plugin-dialogs",
    "runs": true
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-device.DeviceProxy",
    "file": "plugins/cordova-plugin-device/src/windows/DeviceProxy.js",
    "pluginId": "cordova-plugin-device",
    "runs": true
  },
  {
    "id": "kapsel-plugin-inappbrowser.inappbrowser",
    "file": "plugins/kapsel-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "kapsel-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "kapsel-plugin-inappbrowser.InAppBrowserProxy",
    "file": "plugins/kapsel-plugin-inappbrowser/src/windows/InAppBrowserProxy.js",
    "pluginId": "kapsel-plugin-inappbrowser",
    "merges": [
      ""
    ]
  },
  {
    "id": "kapsel-plugin-i18n.i18n",
    "file": "plugins/kapsel-plugin-i18n/www/i18n.js",
    "pluginId": "kapsel-plugin-i18n"
  },
  {
    "id": "kapsel-plugin-i18n.i18n_proxy_win",
    "file": "plugins/kapsel-plugin-i18n/windows/src/i18n_proxy_win.js",
    "pluginId": "kapsel-plugin-i18n",
    "merges": [
      "i18n_proxy_win"
    ]
  },
  {
    "id": "kapsel-plugin-authproxy.AuthProxy",
    "file": "plugins/kapsel-plugin-authproxy/www/authproxy.js",
    "pluginId": "kapsel-plugin-authproxy",
    "clobbers": [
      "sap.AuthProxy"
    ]
  },
  {
    "id": "kapsel-plugin-authproxy.oauth2",
    "file": "plugins/kapsel-plugin-authproxy/www/oauth2.js",
    "pluginId": "kapsel-plugin-authproxy",
    "clobbers": [
      "sap.AuthProxy.OAuth2"
    ]
  },
  {
    "id": "kapsel-plugin-authproxy.saml2",
    "file": "plugins/kapsel-plugin-authproxy/www/saml2.js",
    "pluginId": "kapsel-plugin-authproxy",
    "clobbers": [
      "sap.AuthProxy.SAML2"
    ]
  },
  {
    "id": "kapsel-plugin-authproxy.otp",
    "file": "plugins/kapsel-plugin-authproxy/www/otp.js",
    "pluginId": "kapsel-plugin-authproxy",
    "clobbers": [
      "sap.AuthProxy.OTP"
    ]
  },
  {
    "id": "kapsel-plugin-authproxy.datajsClient",
    "file": "plugins/kapsel-plugin-authproxy/www/datajsClient.js",
    "pluginId": "kapsel-plugin-authproxy",
    "runs": true
  },
  {
    "id": "kapsel-plugin-authproxy.utils",
    "file": "plugins/kapsel-plugin-authproxy/www/utils.js",
    "pluginId": "kapsel-plugin-authproxy",
    "runs": true
  },
  {
    "id": "kapsel-plugin-authproxy.AuthProxyPlugin",
    "file": "plugins/kapsel-plugin-authproxy/windows/src/AuthProxyPlugin.js",
    "pluginId": "kapsel-plugin-authproxy",
    "merges": [
      "AuthProxyPlugin"
    ]
  },
  {
    "id": "kapsel-plugin-xhook.Xhook",
    "file": "plugins/kapsel-plugin-xhook/www/xhooks.js",
    "pluginId": "kapsel-plugin-xhook",
    "clobbers": [
      "sap.Xhook"
    ]
  },
  {
    "id": "kapsel-plugin-odata.OData",
    "file": "plugins/kapsel-plugin-odata/www/OData.js",
    "pluginId": "kapsel-plugin-odata",
    "clobbers": [
      "window.sap.OData"
    ]
  },
  {
    "id": "kapsel-plugin-odata.OfflineStore",
    "file": "plugins/kapsel-plugin-odata/www/OfflineStore.js",
    "pluginId": "kapsel-plugin-odata",
    "clobbers": [
      "window.sap.OfflineStore"
    ]
  },
  {
    "id": "kapsel-plugin-odata.odata_proxy_win",
    "file": "plugins/kapsel-plugin-odata/windows/src/odata_proxy_win.js",
    "pluginId": "kapsel-plugin-odata",
    "merges": [
      "odata_proxy_win"
    ]
  },
  {
    "id": "kapsel-plugin-odata.MimeTypes",
    "file": "plugins/kapsel-plugin-odata/windows/src/mimetypes.js",
    "pluginId": "kapsel-plugin-odata",
    "merges": [
      "MimeTypes"
    ]
  },
  {
    "id": "kapsel-plugin-odata.MimeExtensionHandler",
    "file": "plugins/kapsel-plugin-odata/windows/src/mimeExtensions.js",
    "pluginId": "kapsel-plugin-odata",
    "clobbers": [
      "sap.MimeExtensionHandler"
    ]
  },
  {
    "id": "kapsel-plugin-logon.LogonCore",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/MAFLogonCorePlugin.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.logon.Core"
    ]
  },
  {
    "id": "kapsel-plugin-logon.LogonLocalStorage",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/LogonCoreLocalStorage.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.logon.CoreLocalStorage"
    ]
  },
  {
    "id": "kapsel-plugin-logon.LogonUtils",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/Utils.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.logon.Utils"
    ]
  },
  {
    "id": "kapsel-plugin-logon.LogonStaticScreens",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/StaticScreens.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.logon.StaticScreens"
    ]
  },
  {
    "id": "kapsel-plugin-logon.LogonDynamicScreens",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/DynamicScreens.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.logon.DynamicScreens"
    ]
  },
  {
    "id": "kapsel-plugin-logon.Logon",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/LogonController.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.Logon"
    ]
  },
  {
    "id": "kapsel-plugin-logon.LogonJsView",
    "file": "plugins/kapsel-plugin-logon/www/common/modules/LogonJsView.js",
    "pluginId": "kapsel-plugin-logon",
    "clobbers": [
      "sap.logon.LogonJsView",
      "sap.logon.IabUi"
    ]
  },
  {
    "id": "kapsel-plugin-logon.logon_proxy_win",
    "file": "plugins/kapsel-plugin-logon/windows/src/logon_proxy_win.js",
    "pluginId": "kapsel-plugin-logon",
    "merges": [
      "logon_proxy_win"
    ]
  },
  {
    "id": "kapsel-plugin-logger.Logging",
    "file": "plugins/kapsel-plugin-logger/www/logger.js",
    "pluginId": "kapsel-plugin-logger",
    "clobbers": [
      "sap.Logger"
    ]
  },
  {
    "id": "kapsel-plugin-logger.logger_proxy_win",
    "file": "plugins/kapsel-plugin-logger/windows/src/logger_proxy_win.js",
    "pluginId": "kapsel-plugin-logger",
    "clobbers": [
      "logger_proxy_win"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-network-information": "2.0.1",
  "cordova-plugin-dialogs": "2.0.1",
  "kapsel-plugin-corelibs": "4.2.1",
  "cordova-plugin-device": "2.0.2",
  "kapsel-plugin-inappbrowser": "4.2.1",
  "kapsel-plugin-i18n": "4.2.1",
  "kapsel-plugin-authproxy": "4.2.1",
  "kapsel-plugin-xhook": "4.2.1",
  "kapsel-plugin-odata": "4.2.1",
  "kapsel-plugin-ui5": "4.2.1",
  "kapsel-plugin-logon": "4.2.1",
  "kapsel-plugin-logger": "4.2.1"
};
// BOTTOM OF METADATA
});