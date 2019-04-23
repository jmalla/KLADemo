/*global QUnit*/

sap.ui.define([
	"KLADemo/KLADemo/controller/MainVIew.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainVIew Controller");

	QUnit.test("I should test the MainVIew controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});