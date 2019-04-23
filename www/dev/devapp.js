jQuery.sap.declare("KLADemo.dev.devapp");
jQuery.sap.require("KLADemo.dev.devlogon");

KLADemo.dev.devapp = {
	smpInfo: {},
	externalURL: null,

	//Application Constructor
	initialize: function() {
		this.bindEvents();
	},

	//========================================================================
	// Bind Cordova Event Listeners
	//========================================================================
	bindEvents: function() {
		//add an event listener for the Cordova deviceReady event.
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},

	//========================================================================
	//Cordova Device Ready
	//========================================================================
	onDeviceReady: function() {
        if (window.sap_webide_FacadePreview) {
            debugger;
			startApp();
        } else {
            debugger;
			var that = KLADemo.dev.devapp;
            $.getJSON(".project.json", function (data) {
                //debugger;
                //////////////////////////////////////////////////////////////////////////////
                //April 18th 2019 - Added by Jay - to store this project_json for consumption later:
                //Create a JSONModel 
                var oModel = new sap.ui.model.json.JSONModel();
                //Set the data from the read in contents - in the variable data that is read in from the file
                oModel.setData(data);
                // Set the projet_json model for the ui core
                sap.ui.getCore().setModel(oModel, "project_json");
                //Write this out to the console...
                console.log(sap.ui.getCore().getModel("project_json").getData());
                //////////////////////////////////////////////////////////////////////////////

				if (data && data.hybrid && data.hybrid.plugins.kapsel.logon.selected) {
					that.smpInfo.server = data.hybrid.msType === 0 ? data.hybrid.hcpmsServer : data.hybrid.server;
					that.smpInfo.port = data.hybrid.msType === 0 ? "443" : data.hybrid.port;
					that.smpInfo.appID = data.hybrid.appid;

					//external Odata service url
					if (data.hybrid.externalURL && data.hybrid.externalURL.length > 0) {
						that.externalURL = data.hybrid.externalURL;
					}
				}
				if (that.smpInfo.server && that.smpInfo.server.length > 0) {
					var context = {
						"serverHost": that.smpInfo.server,
						"https": data.hybrid.msType === 0 ? "true" : "false",
						"serverPort": that.smpInfo.port
					};
                    that.devLogon = new KLADemo.dev.devlogon();
                    debugger;
					that.devLogon.doLogonInit(context, that.smpInfo.appID);
				} else {
					startApp();
				}
			});
		}
	}
};