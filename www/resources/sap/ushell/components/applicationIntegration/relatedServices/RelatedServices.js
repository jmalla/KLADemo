// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function R(){var b;var s={};this._historyBackNavigation=function(){window.history.back();};this.navigateBack=function(){if(b){b();}else{this._historyBackNavigation();}};this.setNavigateBack=function(i){b=i;s.backNavigationHander=b;};this.resetNavigateBack=function(){b=this._historyBackNavigation;s.backNavigationHander=b;};this.create=function(){b=this._historyBackNavigation;s={backNavigationHander:b};return s;};this.restore=function(i){if(i){s=i;b=s.backNavigationHander;}};this.store=function(S){if(S){}};this.destroy=function(S){};}return new R();},true);