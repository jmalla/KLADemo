sap.ui.define(["jquery.sap.global","sap/ui/core/support/Plugin","sap/ui/core/support/Support","sap/ui/core/format/DateFormat","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/ovp/support/lib/CommonChecks","sap/ovp/support/lib/CommonMethods"],function(q,P,S,D,J,M,C,a){"use strict";var p="sapUiSupportFioriElementsPluginALPLROP";function g(s){var o,A,v=p+"-View",d=[],e=sap.ui.getCore().getEventBus(),m,b,r,c,I,t=10,T;function G(){return p;}function f(i){var g1=D.getDateInstance({source:{pattern:"YYYYMMdd"},style:"short"});return g1.format(g1.parse(String(i).substring(0,8)));}function h(i){var g1=window.location.origin;var h1=window.location.pathname;var i1=i||C.getComponentIDByStructure();if(i1){m=C.getManifestPath(i1);if(m){var j1=C.getManifestURL(g1,h1,m);if(j1){return j1;}}}return"";}function j(i,g1,h1,i1,j1){if(i==="string"){d.push({order:h1,name:g1,type:i,value:i1});return true;}else if(i==="link"){d.push({order:h1,name:g1,type:i,value:i1,target:j1});return true;}else if(i==="group"){d.push({order:h1,name:g1,type:i});return true;}return false;}function k(i,g1,h1){return j("string",i,g1,h1,"");}function l(i,g1,h1,i1){return j("link",i,g1,h1,i1);}function n(i,g1){return j("group",i,g1,"","");}function u(i){if(!(i&&a.hasObjectContent(i))){return undefined;}if(!(i.getMetadata()&&a.hasObjectContent(i.getMetadata()))){return undefined;}var g1=i.getMetadata();if(!(g1.getManifest()&&a.hasObjectContent(g1.getManifest()))){return undefined;}return g1.getManifest();}function w(i){d=[];k("Error",0,i);X();}function x(i){try{var g1=C.getUI5VersionInfo();if(g1&&a.hasObjectContent(g1)){k("OpenUI5 Version",i,g1.version+" (built at "+f(g1.buildTimestamp)+")");return true;}else{k("OpenUI5 Version",i,"ERROR: OpenUI5 version is not available!");return false;}}catch(ex){k("OpenUI5 Version",i,sap.ui.version+", detailed UI5 version info is not available! Possible reason: missing file \"sap-ui-version.json\"");return true;}}function y(i){var g1=a.getApplicationName(window.location.href);if(g1){l("Application URL",i,"#"+g1,window.location.href);return true;}else{k("Application URL",i,"ERROR: Could not extract application name (#semanticObject-action) from URL!");return false;}}function z(i){if(m&&b){var g1=m;if(m.indexOf("./")===0){g1=m.substring(2,m.length);}l("Manifest",i,g1,b);return true;}else{k("Manifest",i,"ERROR: Could not generate link to manifest.json! Possible reason: The application did not finish loading or is not a Fiori Elements application.");return false;}}function B(i){if(!(c)){return false;}var g1=C.getRegistrationIDsByManifest(c);if(g1&&Array.isArray(g1)&&g1.length>0){k((g1.length>1?"Fiori IDs":"Fiori ID"),i,a.concatStrings(g1));return true;}return false;}function E(i){var g1=C.getApplicationComponentByManifest(c);if(g1){k("Application Component (ACH)",i,g1);return true;}else{k("Application Component (ACH)",i,"ERROR: Path /sap.app/ach not found in manifest.json! Possible reason: Invalid manifest.json");return false;}}function F(i){var g1=C.getApplicationIDByManifest(c);if(g1){k("Application ID",i,g1);return true;}else{k("Application ID",i,"ERROR: Path /sap.app/id not found in manifest.json! Possible reason: Invalid manifest.json");return false;}}function H(i){if(c){var g1=C.getFloorplanByManifest(c);}else{g1=C.getFloorplanByStructure();}if(!C.isValidFloorplan(g1)){g1=C.mFloorplans.UNKNOWN;}if(g1===C.mFloorplans.UNKNOWN){k("Floorplan Component (ACH)",i,C.getTicketComponentForFloorplan(g1)+" (ERROR: Unknown floorplan! Possible reason: Invalid manifest.json)");return false;}else{k("Floorplan Component (ACH)",i,C.getTicketComponentForFloorplan(g1)+" ("+g1+")");return true;}}function K(i,g1){if(!(c&&a.hasObjectContent(c))){return false;}if(!(c["sap.app"]&&c["sap.app"].dataSources&&c["sap.app"].dataSources[i])){k("OData Service Metadata",g1,"ERROR: Data source "+i+" not found at /sap.app/dataSources/"+i+" in manifest.json! Possible reason: Invalid manifest.json");return false;}if(!c["sap.app"].dataSources[i].uri){k("OData Service Metadata",g1,"ERROR: Data source URI not found at /sap.app/dataSources/"+i+"/uri in manifest.json! Possible reason: Invalid manifest.json");return false;}var h1=c["sap.app"].dataSources[i].uri;if(h1.lastIndexOf("/")!==h1.length-1){h1+="/";}h1+="$metadata";l("OData Metadata",g1,h1,window.location.origin+h1);return true;}function L(i,g1){if(!(c&&a.hasObjectContent(c)&&r)){return false;}if(!(c["sap.app"]&&c["sap.app"].dataSources&&c["sap.app"].dataSources[i])){k("Annotations",g1,"ERROR: Data source "+i+" not found at /sap.app/dataSources/"+i+" in manifest.json! Possible reason: Invalid manifest.json");return false;}if(!(c["sap.app"].dataSources[i].settings&&c["sap.app"].dataSources[i].settings.annotations&&c["sap.app"].dataSources[i].settings.annotations!==[])){k("Annotations",g1,"ERROR: Data source "+i+" has no annotations at /sap.app/dataSources/"+i+"/settings/annotations in manifest.json! Possible reason: Invalid manifest.json");return false;}var h1=c["sap.app"].dataSources[i].settings.annotations;h1=h1.reverse();for(var i1 in h1){if(!h1.hasOwnProperty(i1)){continue;}var j1=h1[i1];if(c["sap.app"].dataSources[j1]){var k1=c["sap.app"].dataSources[j1].uri;if(!k1){continue;}var l1="";var m1="";if(k1.indexOf("/")===0){m1="Backend Annotation";l1=window.location.origin;}else{m1="Local Annotation";l1=r;if(l1.lastIndexOf("/")!==l1.length-1){l1+="/";}}m1+=" (Prio. "+parseInt(parseInt(i1,10)+1,10)+")";l(m1,g1,c["sap.app"].dataSources[j1].uri,l1+c["sap.app"].dataSources[j1].uri);}}return true;}function N(i){if(!(c)){return;}var g1=0;function h1(p1){g1+=0.01;return p1+g1;}if(!(c["sap.ui5"]&&c["sap.ui5"].models)){k("Data Sources",i,"ERROR: Path /sap.ui5/models not found in manifest.json! Possible reason: Invalid manifest.json");return;}var i1=c["sap.ui5"].models;var j1=[];for(var k1 in i1){if(!i1.hasOwnProperty(k1)){continue;}if(i1[k1]&&i1[k1].dataSource&&i1[k1].dataSource!==""){var l1=false;for(var m1 in j1){if(!j1.hasOwnProperty(m1)){continue;}if(j1[m1].dataSource===i1[k1].dataSource){l1=true;break;}}var n1=(k1===""?"mainService":k1);if(!l1){j1.push({models:[n1],dataSource:i1[k1].dataSource});}else{j1[m1].models.push(n1);}}}if(j1.length===0){k("Data Sources",i,"ERROR: No models with data sources found in manifest.json! Possible reason: Invalid manifest.json");return;}for(var o1 in j1){if(!j1.hasOwnProperty(o1)){continue;}if(!(c["sap.app"]&&c["sap.app"].dataSources)){k("Data Sources",i,"ERROR: No data sources found at /sap.app/dataSources in manifest.json! Possible reason: Invalid manifest.json");return;}if(!c["sap.app"].dataSources[j1[o1].dataSource]){k("Data Sources",i,"ERROR: Data source "+j1[o1].dataSource+" not found at /sap.app/dataSources/"+j1[o1].dataSource+" in manifest.json! Possible reason: Invalid manifest.json");return;}n(a.concatStrings(j1[o1].models),h1(i));K(j1[o1].dataSource,h1(i));L(j1[o1].dataSource,h1(i));}}function O(i){var g1=sap.ui.getCore().byId(i);if(g1){return g1;}else{return sap.ui.xmlview(i,{viewName:"sap.ovp.support.DiagnosticsTool.view.DiagnosticsTool",viewData:{plugin:o}});}}function R(){var i=O(v);i.placeAt(p);var g1=new J();i.setModel(g1,"data");}function Q(i){if(i){var g1=q("#"+p+"-Panel #"+p+"-Panel");if(g1&&g1.length&&g1.length>0){var h1=q.sap.byId(p+"-PanelHeader");h1.off("click");h1.click(function(){var i1=h1.find("#"+p+"-PanelHandle");var j1=q.sap.byId(p+"-PanelContent");if(i1.hasClass("sapUiSupportPnlHdrHdlClosed")){i1.removeClass("sapUiSupportPnlHdrHdlClosed");j1.removeClass("sapUiSupportHidden");}else{i1.addClass("sapUiSupportPnlHdrHdlClosed");j1.addClass("sapUiSupportHidden");}});g1.replaceWith(q.sap.byId(p));}if(q.sap.fnExitFioriElementsToolInstance){q.sap.fnExitFioriElementsToolInstance();}q.sap.fnExitFioriElementsToolInstance=V;}else{if(q.sap.fnExitFioriElementsWindowInstance){q.sap.fnExitFioriElementsWindowInstance();}q.sap.fnExitFioriElementsWindowInstance=V;if(q.sap.oCommonMethodsFioriElementsWindowInstance){a.setApplicationStatus(q.sap.oCommonMethodsFioriElementsWindowInstance.getApplicationStatus());a.setAppComponent(q.sap.oCommonMethodsFioriElementsWindowInstance.getAppComponent());}q.sap.oCommonMethodsFioriElementsWindowInstance=a;}}function U(){o=this;A=window.location.hash.slice(1);Q(s.isToolStub());if(s.isToolStub()){if(!s.hasListeners(p+"SetData")){s.attachEvent(p+"SetData",a1);}if(!s.hasListeners(p+"UpdateStatus")){s.attachEvent(p+"UpdateStatus",b1);}if(!s.hasListeners(p+"ShowDataRefreshed")){s.attachEvent(p+"ShowDataRefreshed",c1);}q.sap.fioriElementsPluginID=p;R();}else{if(!s.hasListeners(p+"GetData")){s.attachEvent(p+"GetData",_);}e.unsubscribe("elements","ViewRendered",e1);e.unsubscribe("elements","ViewRenderingStarted",e1);e.subscribe("elements","ViewRendered",e1);e.subscribe("elements","ViewRenderingStarted",e1);if("onhashchange"in window){q(window).bind("hashchange",f1);}}_();}function V(){if(s.isToolStub()){q.sap.fnFEPluginToolInstanceExit=undefined;s.detachEvent(p+"SetData",a1);s.detachEvent(p+"UpdateStatus",b1);s.detachEvent(p+"ShowDataRefreshed",c1);O(v).destroy();}else{q.sap.fnFEPluginAppInstanceExit=undefined;s.detachEvent(p+"GetData",_);e.unsubscribe("elements","ViewRendered",e1);e.unsubscribe("elements","ViewRenderingStarted",e1);if("onhashchange"in window){q(window).unbind("hashchange",f1);}}}function W(){s.sendEvent(p+"GetData",{});}function X(){var i=new J();d.sort(a.getDynamicComparator("order"));var g1=new Date().toLocaleTimeString([],{hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});var h1=true;if(!d||d.length===0){h1=false;}var i1=a.getApplicationStatus();if(!i1){a.setApplicationStatus(a.mApplicationStatus.UNKNOWN);i1=a.mApplicationStatus.UNKNOWN;}var j1="";if(i1===a.mApplicationStatus.FAILED){j1="The application did not finish loading or is no Fiori Elements application! The shown data below could be collected anyway. If the application finishes loading, the data will be updated automatically.";}i.setData({properties:d,url:window.location.href,origin:window.location.origin,retrieval:g1,copyEnabled:h1,status:i1,statusMessage:j1});s.sendEvent(p+"SetData",JSON.parse(i.getJSON()));}function Y(i,g1){s.sendEvent(p+"UpdateStatus",{timeLeft:i,status:g1});}function Z(){s.sendEvent(p+"ShowDataRefreshed",{});}function $(i){if(b){r=C.getRootPath(b);}d=[];X();x(1);y(2);z(3);X();if(i&&c&&a.hasObjectContent(c)){B(3);E(4);H(5);N(6);X();Z();}else if(b){q.when(a.getFileFromURI(b)).done(function(g1){c=g1;B(3);F(4);E(5);H(6);N(7);}).fail(function(){k("Manifest",3,"ERROR: Could not access manifest.json even though link could be generated! Possible reason: missing permission to access file.");}).always(function(){X();Z();});}}function _(){c=undefined;b=undefined;r=undefined;var i=a.getApplicationStatus();var g1=a.getAppComponent();var h1=false;if(!(i&&a.isValidApplicationStatus(i))){i=a.mApplicationStatus.UNKNOWN;}if(i===a.mApplicationStatus.LOADING){e1();return;}else if(i===a.mApplicationStatus.FAILED){var i1=u(g1);if(i1&&a.hasObjectContent(i1)){c=i1;if(c&&c["sap.app"]&&c["sap.app"].id){b=h(c["sap.app"].id);if(!b){h1=true;}}else{h1=true;}}else{w("Could not load any data because manifest and component of current application are unknown!");Z();return;}}else if(i===a.mApplicationStatus.RENDERED){b=h();if(!b){i1=u(g1);if(i1&&a.hasObjectContent(i1)){c=i1;if(c&&c["sap.app"]&&c["sap.app"].id){b=h(c["sap.app"].id);if(!b){h1=true;}}else{h1=true;}}else{w("Could not load any data because manifest and component of current application are unknown!");Z();return;}}}else if(i===a.mApplicationStatus.UNKNOWN){if(C.getFloorplanByStructure()!==C.mFloorplans.UNKNOWN){c=C.getManifestByStructure();if(c&&a.hasObjectContent(c)){if(c&&c["sap.app"]&&c["sap.app"].id){b=h(c["sap.app"].id);if(!b){h1=true;}}else{h1=true;}}}else{w("Could not load any data because manifest and component of current application are unknown!");Z();return;}}$(h1);}function a1(i){var g1=new J();g1.setJSON(JSON.stringify(i.getParameters()));var h1=O(v);h1.setModel(g1,"data");h1.invalidate();}function b1(i){var g1=i.getParameters();O(v).getController().updateStatus(g1.timeLeft,g1.status);}function c1(){var i=O(v);i.getController().showDataRefreshed();}function d1(){var i=a.getApplicationStatus();if(T>0){Y(T,i);}else{T=t;a.setApplicationStatus(a.mApplicationStatus.FAILED);Y(0,a.mApplicationStatus.FAILED);I.removeListener(d1);I=undefined;_();}T--;}function e1(i,g1){if(g1==="ViewRenderingStarted"||(!g1&&a.getApplicationStatus()===a.mApplicationStatus.LOADING)){a.setApplicationStatus(a.mApplicationStatus.LOADING);if(!I){T=t;I=new sap.ui.core.IntervalTrigger(1000);I.addListener(d1);}}else if(g1==="ViewRendered"){a.setApplicationStatus(a.mApplicationStatus.RENDERED);T=t;if(I){I.removeListener(d1);I=undefined;}_();}}function f1(g1){function h1(m1){for(var i=0;i<m1.length;i++){if(m1[i]==="/"||m1[i]==="&"||m1[i]==="?"||m1[i]==="~"){return i;}}return m1.length;}function i1(i,m1){if(!i||!m1){return false;}if(i===m1){return true;}var n1=h1(i);var o1=h1(m1);if(n1!==o1){return false;}else if(i.substr(0,n1)===m1.substr(0,o1)){return true;}return false;}var j1,k1,l1=false;if(g1.originalEvent.oldURL&&g1.originalEvent.newURL){j1=g1.originalEvent.oldURL.split("#")[1];k1=g1.originalEvent.newURL.split("#")[1];}else{j1=A;k1=window.location.hash.slice(1);A=k1;}if(j1.length>=k1.length){l1=i1(k1,j1);}else{l1=i1(j1,k1);}if(!l1){a.setApplicationStatus(a.mApplicationStatus.LOADING);a.setAppComponent(undefined);e1();T=(t/2);}}return{init:U,exit:V,getId:G,onRefresh:W};}return P.extend("sap.ovp.support.DiagnosticsTool.DiagnosticsTool",{constructor:function(s){P.apply(this,[p,"SAP Fiori Elements",s]);q.extend(this,g(s));}});});