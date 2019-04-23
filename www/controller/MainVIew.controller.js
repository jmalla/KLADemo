sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Model",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Model, JSONModel) {
    "use strict";

    return Controller.extend("KLADemo.controller.MainView", {

        self: null,

        online: true,
        applicationContext: null,
        store : null, //Offline OData store
        startTime : null,
        initTime : null,
        unlockTime : null,
        resumeTime : null,
        storeIsOpen : false,

        onInit: function () {
            //debugger;
            self = this;  //Need a reference to this to use in the callback functions
            this.startTime = new Date();

            //this read the contents of the project_json Model set in the devapp.js
            //debugger;
            console.log(sap.ui.getCore().getModel("project_json").getData());

            //Let's bind to some Cordova events for the offline and online actions
            this.bindEvents();

        },

        bindEvents: function () {
            document.addEventListener("offline", this.deviceOffline, false);
            document.addEventListener("online", this.deviceOnline, false);
        },

        btnPress_unRegister: function () {
            sap.m.MessageToast.show("btnPress_unRegister triggered ");
        },

        // Read Business Partners
        btnPress_readBusinessPartners: function () {
            //debugger;
            //sap.m.MessageToast.show("btnPress_readBusinessPartners triggered ");
            this.readBusinessPartners();   //with no additional filters
        },


        // Read Business Partners
        readBusinessPartners: function (isLocal, inErrorState) {
            //debugger;
            this.byId("panelBusinessPartner").setBusy(true);

            //This is the approach....
            //var oSupplierModel = new sap.ui.model.odata.ODataModel("/ES5/sap/opu/odata/iwbep/GWSAMPLE_BASIC/");
            //Let's give the fully qualified OData URL.... Because this works: https://hcpms-s0007610100trial.hanatrial.ondemand.com:443/ES5/BusinessPartnerSet?$top=10
            //var oSupplierModel = new sap.ui.model.odata.ODataModel("https://hcpms-s0007610100trial.hanatrial.ondemand.com:443/ES5", true, "S0007610100","Music@17");

            //////////////////////////////////////////////////////////////////
            //Approach 1 - get from the Global core which we set in Component.js Let's get the model from the Core which was set in the Component controller - since it had the username and password
            //var oSupplierModel = sap.ui.getCore().getModel("SuppliersModel"); 
            // Better to get from component JS
            //var oSupplierModel = this.getModel("SuppliersModel");  //This does not work - 
            var oSupplierModel = this.getOwnerComponent().getModel("SuppliersModel");  //This does not work
            //var oSupplierModel = this.getView().getModel("SuppliersModel");  //This did not work

            //Save this reference - we need in the success call
            var that = this;
            var sQuery = '/BusinessPartnerSet?$top=20';

            var sSearchField = this.getView().byId("searchField").getValue();
            if (sSearchField !== "") {
                sQuery = sQuery + "&$filter=CompanyName eq '" + sSearchField + "'";
            }

            //////////////////////////
            // we had to add this code for the different filtering critirea
            if (isLocal === true) {
                if (!this.store) {
                    this.updateStatus2("The store must be opened before reading local entities.");
                    return;
                }
                sQuery = sQuery + "&$filter=sap.islocal()";
            }
            if (inErrorState === true) {
                if (!this.store) {
                    this.updateStatus2("The store must be opened before reading error entities.");
                    return;
                }
                sQuery = sQuery + "&$filter=sap.inerrorstate()";
            }

            ///////////////////////////

            oSupplierModel.read(sQuery, null, null, true, function (oData, oResponse) {
                console.log("Read successful: " + JSON.stringify(oData));

                //Set the model for teh view
                that.getView().setModel(oSupplierModel, "SuppliersModel");

                //Get a reference to the SuppliersTable control
                var oSuppliersTable = that.getView().byId("SuppliersTable");

                // create JSON model instance
                var oSupplierJSONModel = new sap.ui.model.json.JSONModel(oData);
                oSuppliersTable.setModel(oSupplierJSONModel, "SuppliersModel");
                that.byId("panelBusinessPartner").setBusy(false);
            }, function (err) {
                alert("Error reading from OData" + err.responseText);
                sap.m.MessageToast.show("Error reading from OData" + JSON.stringify(err));
                console.log("Read failed");
                console.log(err);
                that.byId("panelBusinessPartner").setBusy(false);
            });
        },


		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
        onPress: function (oEvent) {
            // The source is the list item that got pressed
            var oSelectedItem = oEvent.getSource();
            //This does not work - we need to supply the Model
            //var oContext = oSelectedItem.getBindingContext();
            var oContext = oSelectedItem.getBindingContext("SuppliersModel");
            var sPath = oContext.getPath();
            sap.m.MessageToast.show(sPath + " selected");
            //Get the selected supplier from the path from the table control
            var oSelectedSupplier = this.byId("SuppliersTable").getModel("SuppliersModel").getProperty(sPath);

            //Get the Supplier Form
            var oSupplierForm = this.byId("SupplierForm");

            //Create a JSON mode and pass in the Selected Supplier
            var oOneSupplierJSONModel = new sap.ui.model.json.JSONModel(oSelectedSupplier);
            //Set the model of the table control
            oSupplierForm.setModel(oOneSupplierJSONModel);
            //But then you have to bindElement to the form - 
            //Somehow the date binding is not working... need to check later....
            //debugger;
            oSupplierForm.bindElement("/");

            //this._showObject(oEvent.getSource());
        },

        onSearch: function () {
            this.btnPress_readBusinessPartners();
        },

        onShowDetailPopover: function () {
            sap.m.MessageToast.show("onShowDetailPopover called");
        },

        //Create Business Partner using AJAX
        btnPress_createBusinessPartner: function () {
            //debugger;
            //sap.m.MessageToast.show("btnPress_createBusinessPartner triggered ");
            this.byId("panelCreateBusinessPartner").setBusy(true);		

            // Get the model from the view set earlier on with the Read
            var oSModel = this.getView().getModel("SuppliersModel");

            //Create a New Supplier
            var BusinessPartner = {};

            // This is how the JSON needs to be for the create - this is from a SuccessFul create in the CRUD Example
            // {
            // 	"Address": {
            // 		"City": "San Francisco",
            // 		"PostalCode": "94111",
            // 		"Street": "111 Chestnut Street",
            // 		"Building": "1",
            // 		"Country": "US",
            // 		"AddressType": "01"
            // 	},
            // 	"BusinessPartnerID": "0100500000",
            // 	"CompanyName": "Licensed To Code",
            // 	"EmailAddress": "info@licensedtocode.com",
            // 	"CurrencyCode": "USD",
            // 	"BusinessPartnerRole": "01",
            // 	"__metadata": {
            // 		"type": "GWSAMPLE_BASIC.BusinessPartner"
            // 	}
            // };

            BusinessPartner.Address = {};
            BusinessPartner.Address.City = this.getView().byId("Address_City").getValue();
            BusinessPartner.Address.PostalCode = this.getView().byId("Address_PostalCode").getValue();
            BusinessPartner.Address.Street = this.getView().byId("Address_Street").getValue();
            BusinessPartner.Address.Building = this.getView().byId("Address_Building").getValue();
            BusinessPartner.Address.Country = this.getView().byId("Address_Country").getValue();
            BusinessPartner.Address.AddressType = this.getView().byId("Address_AddressType").getValue();
            //BusinessPartner.ID = this.getView().byId("Form_BusinessPartnerID").getValue();
            BusinessPartner.CompanyName = this.getView().byId("Form_CompanyName").getValue();
            BusinessPartner.EmailAddress = this.getView().byId("Form_EmailAddress").getValue();
            BusinessPartner.CurrencyCode = this.getView().byId("Form_CurrencyCode").getValue();
            BusinessPartner.BusinessPartnerRole = this.getView().byId("Form_BusinessPartnerRole").getValue();
            BusinessPartner.WebAddress = this.getView().byId("Form_WebAddress").getValue();

            var WebServiceUrl = '/ES5/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet';

            //1.In the service specify the Access control header.
            //https://blogs.sap.com/2017/10/01/cors-cross-origin-resource-sharing-issue-resolved/
            //This code snippet is on the server side to pass back these headers that allows for Cross Origin Request
            //$.response.headers.set("Access-Control-Allow-Origin", "*");
            //$.response.status = $.net.http.OK;

            var token;
            //Need to set the Business Partner ID upon a successful call later
            var that = this;

            //First get the X-CSRF-Token
            $.ajax({
                //The first get is to get the x-csrf-token needed for the POST call later:
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: WebServiceUrl,

                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                },
                complete: function (xhr) {
                    token = xhr.getResponseHeader("X-CSRF-Token");
                    //Then make the POST call with the X-CSRF-Token passed in as the Header
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: WebServiceUrl,
                        data: JSON.stringify(BusinessPartner),
                        dataType: "json",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-CSRF-Token', token);
                        },
                        success: function (msg) {
                            alert('BusinessPartner created ' + msg.d.BusinessPartnerID + ' successfully: ' + JSON.stringify(msg.d));
                            that.getView().byId("Form_BusinessPartnerID").setValue(msg.d.BusinessPartnerID);
                            console.log(msg);
                            console.log(JSON.stringify(msg.d));
                            that.byId("panelCreateBusinessPartner").setBusy(false);		
                        },
                        error: function (err) {
                            alert("Error creating Business Partner" + err.responseText);
                            console.log(err);
                            that.byId("panelCreateBusinessPartner").setBusy(false);		
                        }
                    });
                }
            });
        },

        //Create Business Partner with OData
        btnPress_createBusinessPartnerOData: function () {
            //debugger;
            //sap.m.MessageToast.show("btnPress_createBusinessPartner triggered ");
            this.byId("panelCreateBusinessPartner").setBusy(true);		

            // Get the model from the view set earlier on with the Read
            var oSModel = this.getView().getModel("SuppliersModel");

            //Create a New Supplier
            var BusinessPartner = {};

            BusinessPartner.Address = {};
            BusinessPartner.Address.City = this.getView().byId("Address_City").getValue();
            BusinessPartner.Address.PostalCode = this.getView().byId("Address_PostalCode").getValue();
            BusinessPartner.Address.Street = this.getView().byId("Address_Street").getValue();
            BusinessPartner.Address.Building = this.getView().byId("Address_Building").getValue();
            BusinessPartner.Address.Country = this.getView().byId("Address_Country").getValue();
            BusinessPartner.Address.AddressType = this.getView().byId("Address_AddressType").getValue();
            //BusinessPartner.ID = this.getView().byId("Form_BusinessPartnerID").getValue();
            BusinessPartner.CompanyName = this.getView().byId("Form_CompanyName").getValue();
            BusinessPartner.EmailAddress = this.getView().byId("Form_EmailAddress").getValue();
            BusinessPartner.CurrencyCode = this.getView().byId("Form_CurrencyCode").getValue();
            BusinessPartner.BusinessPartnerRole = this.getView().byId("Form_BusinessPartnerRole").getValue();
            BusinessPartner.WebAddress = this.getView().byId("Form_WebAddress").getValue();

            var WebServiceUrl = '/ES5/sap/opu/odata/iwbep/GWSAMPLE_BASIC';

            //Need to get the x-csrf-token:
            var token;

            //Need to set the Business Partner ID upon a successful call later
            var that = this;

            ////////////////////////////////////////////////////////////////////
            // - Setting this Header causes a problem for the Create
            // var oSupplierModel = this.getView().getModel("SuppliersModel");
            // oSModel.setHeaders({
            // 	"content-type": "application/json;charset=utf-8"
            // });
            oSModel.create('/BusinessPartnerSet', BusinessPartner, null, function (oData, response) {
                alert('BusinessPartner created ' + oData.BusinessPartnerID + ' successfully: ' + JSON.stringify(response));
                sap.m.MessageToast.show("BusinessPartner created " + oData.BusinessPartnerID + " successfully: " + JSON.stringify(response));
                that.getView().byId("Form_BusinessPartnerID").setValue(oData.BusinessPartnerID);
                console.log(response);
                console.log(JSON.stringify(response));
                that.byId("panelCreateBusinessPartner").setBusy(false);		
            }, function (err) {
                alert("Error creating Business Partner" + err.responseText);
                sap.m.MessageToast.show("Error creating Business Partner: " + JSON.stringify(err));
                console.log(err);
                that.byId("panelCreateBusinessPartner").setBusy(false);		    
            });

            oSModel.submitChanges();

        },

        btnPress_updateBusinessPartner: function () {
            //sap.m.MessageToast.show("btnPress_updateBusinessPartner triggered ");
            this.byId("panelCreateBusinessPartner").setBusy(true);		

            // Get the model from the view set earlier on with the Read
            var oSModel = this.getView().getModel("SuppliersModel");

            //Create a New Supplier
            var BusinessPartner = {};

            BusinessPartner.Address = {};
            BusinessPartner.Address.City = this.getView().byId("Address_City").getValue();
            BusinessPartner.Address.PostalCode = this.getView().byId("Address_PostalCode").getValue();
            BusinessPartner.Address.Street = this.getView().byId("Address_Street").getValue();
            BusinessPartner.Address.Building = this.getView().byId("Address_Building").getValue();
            BusinessPartner.Address.Country = this.getView().byId("Address_Country").getValue();
            BusinessPartner.Address.AddressType = this.getView().byId("Address_AddressType").getValue();
            BusinessPartner.BusinessPartnerID = this.getView().byId("Form_BusinessPartnerID").getValue();
            BusinessPartner.CompanyName = this.getView().byId("Form_CompanyName").getValue();
            BusinessPartner.EmailAddress = this.getView().byId("Form_EmailAddress").getValue();
            BusinessPartner.CurrencyCode = this.getView().byId("Form_CurrencyCode").getValue();
            BusinessPartner.BusinessPartnerRole = this.getView().byId("Form_BusinessPartnerRole").getValue();
            BusinessPartner.WebAddress = this.getView().byId("Form_WebAddress").getValue();

            var WebServiceUrl = '/ES5/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet';

            var token;

            //Need to set the Business Partner ID upon a successful call later
            var that = this;

            //First get the X-CSRF-Token
            $.ajax({
                //The first GET call is to get the x-csrf-token which is required for the Post:
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: WebServiceUrl,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                },
                // Upon completion of the Get call
                complete: function (xhr) {
                    //First extract the x-csrf-token
                    token = xhr.getResponseHeader("X-CSRF-Token");
                    //Then make the PUT call with the X-CSRF-Token passed in as the Header
                    $.ajax({
                        type: "PATCH",
                        contentType: "application/json; charset=utf-8",
                        url: WebServiceUrl,
                        data: JSON.stringify(BusinessPartner),
                        dataType: "json",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-CSRF-Token', token);
                        },
                        success: function (msg) {
                            alert('BusinessPartner updated ' + msg.d.BusinessPartnerID + ' successfully: ' + JSON.stringify(msg.d));
                            that.getView().byId("Form_BusinessPartnerID").setValue(msg.d.BusinessPartnerID);
                            console.log(msg);
                            onsole.log(JSON.stringify(msg.d));
                            that.byId("panelCreateBusinessPartner").setBusy(false);		
                        },
                        error: function (err) {
                            alert("Error updating Business Partner" + err.responseText);
                            sap.m.MessageToast.show("Error updating Business Partner" + err.responseText);
                            console.log(err);
                            that.byId("panelCreateBusinessPartner").setBusy(false);		
                        }
                    });
                }
            });
        },

        //Update Business Partner with OData approach
        btnPress_updateBusinessPartnerOData: function () {
            //debugger;
            //sap.m.MessageToast.show("btnPress_updateBusinessPartnerOData triggered ");
            this.byId("panelCreateBusinessPartner").setBusy(true);		

            // Get the model from the view set earlier on with the Read
            var oSModel = this.getView().getModel("SuppliersModel");

            //Create a New Supplier
            var BusinessPartner = {};
            BusinessPartner.Address = {};
            BusinessPartner.Address.City = this.getView().byId("Address_City").getValue();
            BusinessPartner.Address.PostalCode = this.getView().byId("Address_PostalCode").getValue();
            BusinessPartner.Address.Street = this.getView().byId("Address_Street").getValue();
            BusinessPartner.Address.Building = this.getView().byId("Address_Building").getValue();
            BusinessPartner.Address.Country = this.getView().byId("Address_Country").getValue();
            BusinessPartner.Address.AddressType = this.getView().byId("Address_AddressType").getValue();
            BusinessPartner.BusinessPartnerID = this.getView().byId("Form_BusinessPartnerID").getValue();
            //Need to store this since oData is not being returned in the respone
            var vBusinessPartnerID = BusinessPartner.BusinessPartnerID;

            BusinessPartner.CompanyName = this.getView().byId("Form_CompanyName").getValue();
            BusinessPartner.EmailAddress = this.getView().byId("Form_EmailAddress").getValue();
            BusinessPartner.CurrencyCode = this.getView().byId("Form_CurrencyCode").getValue();
            BusinessPartner.BusinessPartnerRole = this.getView().byId("Form_BusinessPartnerRole").getValue();
            BusinessPartner.WebAddress = this.getView().byId("Form_WebAddress").getValue();

            var WebServiceUrl = '/ES5/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet';

            //Need to set the Business Partner ID upon a successful call later
            var that = this;

            //Create the querystring...
            var sODataUpdate = "/BusinessPartnerSet('" + BusinessPartner.BusinessPartnerID + "')";

            //Set the header to avoid the error: 
            oSModel.setHeaders({
                "Content-type": "application/json; charset=utf-8",
                "If-Match": "*",
                "Accept": "application/json`",
            });

            oSModel.update(sODataUpdate, BusinessPartner, null, function (oData, response) {
                //debugger;
                //Somehow on the offline update, the oData is null
                //alert('BusinessPartner updated ' + oData.BusinessPartnerID + ' successfully: ' + JSON.stringify(response));
                alert('BusinessPartner updated ' + vBusinessPartnerID + ' successfully: ' + JSON.stringify(response));
                //sap.m.MessageToast.show('BusinessPartner updated ' + oData.BusinessPartnerID + ' successfully: ' + JSON.stringify(response));
                sap.m.MessageToast.show('BusinessPartner updated ' + vBusinessPartnerID + ' successfully: ' + JSON.stringify(response));
                //that.getView().byId("Form_BusinessPartnerID").setValue(oData.BusinessPartnerID);
                console.log(response);
                console.log(JSON.stringify(response));
                that.byId("panelCreateBusinessPartner").setBusy(false);		
            }, function (err) {
                debugger;
                alert("Error updating Business Partner" + err.responseText);
                sap.m.MessageToast.show("Error updating Business Partner - " + err.message + " : " + err.response.body);
                console.log(err);
                that.byId("panelCreateBusinessPartner").setBusy(false);		
            });

            oSModel.submitChanges();

        },

        mySuccessHandler: function (oSupplier) {
            sap.m.MessageToast.show("mySuccessHandler called");
        },

        myErrorHandler: function (oSupplier) {
            sap.m.MessageToast.show("myErrorHandler called");
        },

        _onCreateSuccess: function (oSupplier) {
            sap.m.MessageToast.show("Created Successfully");
        },

        btnPress_clearLog: function () {
            sap.m.MessageToast.show("btnPress_clearLog triggered ");
        },

        btnPress_viewLog: function () {
            sap.m.MessageToast.show("btnPress_viewLog triggered ");
        },

        btnPress_openStore: function () {
            //debugger;
            sap.m.MessageToast.show("Opening Offline Store");
            this.byId("panelBusinessPartner").setBusy(true);

            console.log("EventLogging: openStore");
            this.startTime = new Date();
            this.updateStatus2("store.open called");

            ////////////////////////////////////////////////////////////////////////
            // From the index.html file in the KapselGSDemo2 which is ready this from the serverContext.js file
            //var properties = {
            //    "name": "BusinessPartnersOfflineStore",
            //    "host": applicationContext.registrationContext.serverHost,
            //    "port": applicationContext.registrationContext.serverPort,
            //    "https": applicationContext.registrationContext.https,
            //    "serviceRoot": appId,
            //    //"storePath" : cordova.file.externalRootDirectory,

            //    "definingRequests": {
            //        "SuppliersDR": "/Suppliers"
            //    }
            //};

            //if (device.platform == "windows") {
            //    var authStr = "Basic " + btoa(applicationContext.registrationContext.user + ":" + applicationContext.registrationContext.password);
            //    properties.streamParams = "custom_header=Authorization:" + authStr;
            //}
            ////////////////////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////////////////
            //// Hard coded values
            //var properties = {
            //    "name": "BusinessPartnersOfflineStore",
            //    "host": "hcpms-s0007610100trial.hanatrial.ondemand.com",
            //    "port": "443",
            //    "https": true,
            //    "serviceRoot": "KLADemo",
            //    //"storePath" : cordova.file.externalRootDirectory,

            //    "definingRequests": {
            //        "BusinessPartnerSetDR": "/BusinessPartnerSet?$top=20"
            //    }
            //};

            //if (device.platform == "windows") {
            //    var authStr = "Basic " + btoa("S0007610100" + ":" + "Music@17");
            //    properties.streamParams = "custom_header=Authorization:" + authStr;
            //}
            ////////////////////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////////////////
            // Read this from sap.ui.getCore().getModel("project_json").getData() which has the the .project.json contents
            var oProjectSettingsModel = sap.ui.getCore().getModel("project_json").getData();

            debugger;
            var properties = {
                "name": "BusinessPartnersOfflineStore",
                "host": oProjectSettingsModel.hybrid.hcpmsServer,
                "port": oProjectSettingsModel.hybrid.port,
                "https": true,
                "serviceRoot": oProjectSettingsModel.hybrid.appid,
                //"storePath" : cordova.file.externalRootDirectory,

                "definingRequests": {
                    "BusinessPartnerSetDR": "/BusinessPartnerSet?$top=20"
                }
            };

            if (device.platform == "windows") {
                var authStr = "Basic " + btoa(oProjectSettingsModel.hybrid.user, + ":" + oProjectSettingsModel.hybrid.password);
                properties.streamParams = "custom_header=Authorization:" + authStr;
            }
            ////////////////////////////////////////////////////////////////////////


            this.store = sap.OData.createOfflineStore(properties);
            this.store.onrequesterror = this.onRequestError(); //called for each modification error during flush

            //Without encryption
            //var options = {};

            debugger;
            //With encryption
            var options = {
                "storeEncryptionKey": "myVerySecretKey123!"
                //"storeEncryptionKey" : applicationContext.registrationContext.password //if using the Logon plugin, the user entered password for the registration can be used if it never changes
            };

            this.store.open(this.openStoreSuccessCallback, this.errorCallback, options, this.progressCallback);
            this.byId("panelBusinessPartner").setBusy(false);
        },

        onRequestError: function (error) {
            alert("An error occurred while FLUSHING " + JSON.stringify(error));
            console.log("An error occurred while FLUSHING " + JSON.stringify(error));
        },

        openStoreSuccessCallback : function () {
            var endTime = new Date();
            //debugger;
            var duration = (endTime - self.startTime) / 1000;
            self.updateStatus2("Store opened in  " + duration + " seconds");
            self.updateStatus1("Store is OPEN.");
            console.log("EventLogging: openStoreSuccessCallback.  Stored opened in " + duration);
            sap.OData.applyHttpClient();  //Offline OData calls can now be made against datajs.
            self.storeIsOpen = true;
        },

        updateStatus1: function (msg) {
            this.byId('statusID').setValue(msg + " " + this.getDeviceStatusString());
            console.log("EventLogging: " + msg + " " + this.getDeviceStatusString());
        },
            
        updateStatus2: function (msg) {
            var d = new Date();
            this.byId('statusID2').setValue(msg + " at " + this.addZero(d.getHours()) + ":" + this.addZero(d.getMinutes()) + "." + this.addZero(d.getSeconds()));
            if (msg.indexOf("Refreshing Sent:") != 0) { //don't bother logging the messages regarding the progress callback for flush and refresh  
                console.log("EventLogging: " + msg + " at " + this.addZero(d.getHours()) + ":" + this.addZero(d.getMinutes()) + "." + this.addZero(d.getSeconds()));
            }
        },
            
        addZero: function (input) {
            if (input < 10) {
                return "0" + input;
            }
            return input;
        },
            
        getDeviceStatusString: function () {
            if (this.online) {
                return "Device is ONLINE";
            }
            else {
                return "Device is OFFLINE";
            }
        },

        errorCallback: function(e) {
            alert("An error occurred: " + JSON.stringify(e));
            sap.m.MessageToast.show("An error occurred: " + JSON.stringify(e));
            console.log("EventLogging: errorCallback " + JSON.stringify(e));
        },

        progressCallback: function (progressStatus) {
            var status = progressStatus.progressState;
            var lead = "unknown";
            if(status === sap.OfflineStore.ProgressState.STORE_DOWNLOADING) {
                lead = "Downloading ";
            }
            else if (status === sap.OfflineStore.ProgressState.REFRESH) {
                lead = "Refreshing ";
            }
            else if (status === sap.OfflineStore.ProgressState.FLUSH_REQUEST_QUEUE) {
                lead = "Flushing ";
            }
            else if (status === sap.OfflineStore.ProgressState.DONE) {
                lead = "Complete ";
            }
            else {
                alert("Unknown status in progressCallback");
            }
            //debugger;
            self.updateStatus2(lead + "Sent: " + progressStatus.bytesSent + "  Received: " + progressStatus.bytesRecv + "   File Size: " + progressStatus.fileSize);
            console.log(lead + "Sent: " + progressStatus.bytesSent + "  Received: " + progressStatus.bytesRecv + "   File Size: " + progressStatus.fileSize);

        },

        deviceOnline: function () {
            debugger;
            self.online = true;
            self.updateStatus1("Device is Online");
        },
            
        deviceOffline: function() {
            debugger;
            self.online = false;
            self.updateStatus1("Device is Offline");
        },

        btnPress_closeStore: function () {
            //debugger;
            sap.m.MessageToast.show("btnPress_closeStore triggered ");
            this.closeStore();
        },

        closeStore: function () {
            if (!this.store) {
                this.updateStatus2("The store must be opened before it can be closed");
                return;
            }
            console.log("EventLogging: closeStore");
            this.updateStatus2("store.close called");
            this.store.close(this.closeStoreSuccessCallback, this.errorCallback);
        },

        closeStoreSuccessCallback: function() {
            console.log("EventLogging: closeStoreSuccessCallback");
            sap.OData.removeHttpClient();
            self.updateStatus1("Store is CLOSED.");
            self.updateStatus2("Store closed");
            self.storeIsOpen = false;
        },

        btnPress_clearStore: function () {
            //debugger;
            sap.m.MessageToast.show("btnPress_clearStore triggered ");
            this.clearStore();
        },

        //Removes the physical store from the filesystem
        clearStore: function () {
            console.log("EventLogging: clearStore");
            sap.m.MessageToast.show("EventLogging: clearStore");
            if (!this.store) {
                this.updateStatus2("The store must be closed before it can be cleared");
                return;
            }
                this.store.clear(this.clearStoreSuccessCallback, this.errorCallback);
        },
            
        clearStoreSuccessCallback: function () {
            console.log("EventLogging: clearStoreSuccessCallback");
            self.updateStatus1("");
            self.updateStatus2("Store is CLEARED");
            self.store = null;
        },

        refreshStore: function () {
            debugger;
            console.log("EventLogging: refreshStore");
            if (!this.store) {
                this.updateStatus2("The store must be open before it can be refreshed");
                return;
            }
            self.startTime = new Date();
            self.updateStatus2("Store refresh called");
            self.store.refresh(self.refreshStoreCallback, self.errorCallback, null, self.progressCallback);
        },

        refreshStoreCallback: function () {
            debugger;
            console.log("EventLogging: refreshStoreCallback");
            var endTime = new Date();
            var duration = (endTime - self.startTime) / 1000;
            self.updateStatus2("Store refreshed in  " + duration + " seconds");
        },

        flushStore: function () {
            debugger;
            console.log("EventLogging: flushStore");
            if (!this.store) {
                this.updateStatus2("The store must be open before it can be flushed");
                return;
            }
            this.startTime = new Date();
            this.updateStatus2("Store flush called");
            this.store.flush(this.flushStoreSuccessCallback, this.errorCallback, null, this.progressCallback);
        },
            
        flushStoreSuccessCallback: function () {
            debugger;
            console.log("EventLogging: flushStoreSuccessCallback");
            var endTime = new Date();
            var duration = (endTime - self.startTime) / 1000;
            self.updateStatus2("Store flushed in  " + duration + " seconds");
            self.refreshStore();
        },


        btnPress_readlocal: function () {
            sap.m.MessageToast.show("Reading local changes");
            //debugger;
            this.readBusinessPartners(true);   //to only read local entries filters
        },

        btnPress_readErrorEntries: function () {
            sap.m.MessageToast.show("Reading error entries");
            //debugger;
            this.readBusinessPartners(false,true);   //with no additional filters
        },

        btnPress_flushStore: function () {
            debugger;
            sap.m.MessageToast.show("Flush and Refresh triggered ");
            this.flushStore();
        },

        btnPress_showErrors: function () {
            sap.m.MessageToast.show("btnPress_showErrors triggered ");
        },

        //Uses the Error Archive.  You can also view rows that are in an error state using a filter or by looking for an annotation.  See the read() method
        showErrors: function () {
            if(!store) {
                updateStatus2("The store must be opened before viewing the ErrorArchive");
                return;
            }
                updateStatus2("ErrorArchive request started");
                //clearTable2("ErrorsTable");
                var sURL = applicationContext.applicationEndpointURL + "/ErrorArchive";
            var oHeaders = {};

            var request = {
                headers: oHeaders,
                requestUri: sURL,
                method: "GET"
            };
            console.log("read using " + sURL);
            OData.read(request, this.showErrorsSuccessCallback, this.errorCallback);
        },

        showErrorsSuccessCallback: function (data, response) {
            updateStatus2("ErrorArchive contains " + data.results.length + " records ");
            console.log(JSON.stringify(data.results));
            //clearTable2("ErrorsTable");
            //showScreen("ErrorsDiv");
            //var errorsForm = document.getElementById("ErrorsForm");
            //errorsForm.setAttribute("requestid", "");
            //var errorsTable = document.getElementById("ErrorsTable");
            //for (var i = 0; i < data.results.length; i++) {
            //    var row = errorsTable.insertRow(1);
            //    var supplier = JSON.parse(data.results[i].RequestBody);
            //    var cell1 = row.insertCell(0);
            //    var cell2 = row.insertCell(1);
            //    var cell3 = row.insertCell(2);
            //    var cell4 = row.insertCell(3);
            //    var cell5 = row.insertCell(4);
            //    var cell6 = row.insertCell(5);
            //    if (i == 0) {  //any requestID will work in the delete call to the ErrorArchive
            //        errorsForm.setAttribute("requestid", data.results[i].RequestID);
            //    }

            //    cell1.innerHTML = data.results[i].RequestMethod;
            //    cell2.innerHTML = data.results[i].HTTPStatusCode;
            //    if (supplier) {
            //        cell3.innerHTML = supplier.Name;
            //        cell4.innerHTML = supplier.City;
            //    }
            //    cell5.innerHTML = data.results[i].RequestURL;
            //    cell6.innerHTML = data.results[i].Message;
            //}
        },


        btnPress_checkRequestQueue: function () {
            sap.m.MessageToast.show("btnPress_checkRequestQueue triggered ");
            this.checkRequestQueue();
        },

        //checkRequestQueue: function() {
        //    if (!this.store) {
        //        this.updateStatus2("The store must be opened before checking the request queue");
        //        return;
        //    }
        //    store.getRequestQueueStatus(this.requestQSuccessCallback, this.errorCallback)
        //},

        //requestQSuccessCallback: function (qStatus) {
        //    var statusStr = " contains items to be flushed";
        //    if (qStatus.isEmpty) {
        //        statusStr = " is empty";
        //    }
        //    this.updateStatus2("Request queue" + statusStr);
        //}, 


        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
        _showObject: function (oItem) {
            sap.m.MessageToast.show(oItem.getBindingContext().getProperty("BusinessPartnerID"));
        }
    });
});