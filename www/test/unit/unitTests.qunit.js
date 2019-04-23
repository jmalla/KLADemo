/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"KLADemo/KLADemo/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});