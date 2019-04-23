// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_AppState/WindowAdapter","sap/ushell/services/_AppState/SequentializingAdapter","sap/ushell/services/_AppState/AppState","sap/ushell/services/_AppState/Sequentializer","sap/ushell/utils"],function(W,S,A,a,u){"use strict";function g(c){return u.isDefined(c)&&u.isDefined(c.transient)?!!c.transient:true;}function b(o,c,p,C){this._oConfig=C&&C.config;this._sSessionKey="";this._oAdapter=new S(o);this._oAdapter=new W(this,this._oAdapter,C);}b.prototype._getSessionKey=function(){if(!this._sSessionKey){this._sSessionKey=this._getGeneratedKey();}return this._sSessionKey;};b.prototype.getAppState=function(k){var d=new jQuery.Deferred(),t=this,o;this._loadAppState(k).done(function(k,D){o=new A(t,k,false,D);d.resolve(o);}).fail(function(m){o=new A(t,k);d.resolve(o);});return d.promise();};b.prototype._getGeneratedKey=function(){var s=sap.ushell.Container.getService("Personalization").getGeneratedKey();s=("AS"+s).substring(0,40);return s;};b.prototype.createEmptyAppState=function(c,t){var k=this._getGeneratedKey(),o,s="",d="",U=u.isDefined(t)?t:g(this._oConfig);if(c){if(!(c instanceof sap.ui.core.UIComponent)){throw new Error("oComponent passed must be a UI5 Component");}if(c.getMetadata&&c.getMetadata()&&typeof c.getMetadata().getName==="function"){s=c.getMetadata().getName()||"";}if(!s&&c.getMetadata&&c.getMetadata().getComponentName){s=c.getMetadata().getComponentName();}if(c.getMetadata&&c.getMetadata()&&typeof c.getMetadata().getManifest==="function"&&typeof c.getMetadata().getManifest()==="object"&&typeof c.getMetadata().getManifest()["sap.app"]==="object"){d=c.getMetadata().getManifest()["sap.app"].ach||"";}}o=new A(this,k,true,undefined,s,d,U);return o;};b.prototype.createEmptyUnmodifiableAppState=function(c){var k=this._getGeneratedKey(),o;o=new A(this,k,false);return o;};b.prototype._saveAppState=function(k,d,s,c,t){var e=this._getSessionKey(),U=u.isDefined(t)?t:g(this._oConfig);return this._oAdapter.saveAppState(k,e,d,s,c,U);};b.prototype._loadAppState=function(k){return this._oAdapter.loadAppState(k);};b._getSequentializer=function(){return new a();};b.WindowAdapter=W;b.hasNoAdapter=false;return b;},true);