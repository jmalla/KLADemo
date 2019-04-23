// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ui/Device','sap/m/BusyIndicator','sap/m/SplitApp','sap/m/Label','sap/m/Link','sap/m/Text','sap/m/Page','sap/m/StandardListItem','sap/m/CustomListItem','sap/m/List','sap/m/VBox','sap/m/Bar','sap/m/ScrollContainer','sap/m/library','sap/ui/core/library','sap/ushell/ui/launchpad/AccessibilityCustomData'],function(D,B,S,L,a,T,P,b,C,c,V,d,f,m,g,A){"use strict";var h=m.BarDesign,i=m.ListMode,j=m.ListType,k=m.SplitAppMode,l=g.TextAlign;sap.ui.jsview("sap.ushell.renderers.fiori2.allMyApps.AllMyApps",{createContent:function(o){this.oMasterBusyIndicator=new B('allMyAppsMasterBusyIndicator',{size:"1rem"}).addStyleClass("sapUshellAllMyAppsBusyIndicator");this.oDetailBusyIndicator=new B('allMyAppsDetailBusyIndicator',{size:"1rem"}).addStyleClass("sapUshellAllMyAppsBusyIndicator");this.oSplitApp=new S("sapUshellAllMyAppsMasterDetail",{masterPages:[this.oMasterBusyIndicator,this.getMasterPartContent(o)],detailPages:[this.oDetailBusyIndicator,this.getEmptyDetailsContent(),this.getDetailsPartContent(o)],mode:{path:'/isPhoneWidth',formatter:function(I){return I?k.ShowHideMode:k.StretchCompressMode;}}}).addStyleClass("sapUshellAllMyAppsView");this.bAfterOpenHandlerCalled=false;return this.oSplitApp;},getEmptyDetailsContent:function(){var t,e;t=new L({text:sap.ushell.resources.i18n.getText('AllMyAppsEmptyText'),textAlign:l.Center}).addStyleClass('sapUshellAllMyAppsEmptyDetailsPageText');e=new P('sapUshellAllMyAppsEmptyDetailsPage',{content:[t],showHeader:false,enableScrolling:false});return e;},getMasterPartContent:function(o){var e;if(!this.oDataSourceList){this.oDataSourceListTemplate=new b({type:{parts:['allMyAppsModel>type','/allMyAppsMasterLevel'],formatter:function(t,n){var s=D.system.phone||((n===this.getController().oStateEnum.FIRST_LEVEL)&&(t!==sap.ushell.Container.getService('AllMyApps').getProviderTypeEnum().CATALOG));return s?j.Navigation:j.Active;}.bind(this)},title:'{allMyAppsModel>title}'});this._addCustomData(this.oDataSourceListTemplate,"aria-controls","sapUshellAllMyAppsDetailsPage");this.oDataSourceList=new c('sapUshellAllMyAppsDataSourcesList',{tooltip:'{i18n>catalogSelect_tooltip}',rememberSelections:true,mode:D.system.phone?i.None:i.SingleSelectMaster,items:{path:'allMyAppsModel>/AppsData',template:this.oDataSourceListTemplate},growingThreshold:100,showNoData:false,itemPress:[o.handleMasterListItemPress,o]});this._addCustomData(this.oDataSourceList,"role","navigation");}e=new P("sapUshellAllMyAppsMasterPage",{showHeader:false});e.addContent(this.oDataSourceList);return e;},getDetailsPartContent:function(o){var n=new V(),t=new L({text:'{allMyAppsModel>title}'}),s=new L({text:'{allMyAppsModel>subTitle}',visible:{parts:['allMyAppsModel>subTitle'],formatter:function(e){return e?true:false;}}}),I,p,q;t.addStyleClass("sapUshellAllMyAppsItemTitle");s.addStyleClass("sapUshellAllMyAppsItemSubTitle");n.addItem(t);n.addItem(s);I=new C({content:n,type:j.Active,press:function(){o.onAppItemClick(this);}});I.addStyleClass("sapUshellAllMyAppsListItem");I.addEventDelegate({onsapenter:function(e){o.onAppItemClick(e.srcControl);},onsapspace:function(e){o.onAppItemClick(e.srcControl);}});this.oDetailsHeaderLabel=new L("sapUshellAllMyAppsDetailsHeaderLabel",{});p=new d("sapUshellDetailsPageHeaderBar",{contentLeft:this.oDetailsHeaderLabel,contentRight:[],contentMiddle:[],design:h.Header});this.oItemsContainerlist=new c("oItemsContainerlist",{items:{path:"allMyAppsModel>apps",template:I}});this.oItemsContainer=new f("allMyAppsScrollContainer",{horizontal:false,vertical:true,content:this.oItemsContainerlist}).addStyleClass("sapUshellAllMyAppsDetailsItemContainer");this.oCustomLink=new a({text:{path:"allMyAppsModel>sCustomLink"},press:function(e){o.handleGroupPress(e);}});this.oCustomLabel=new T({text:{path:"allMyAppsModel>sCustomLabel"}});this.oCustomPanel=new V({visible:{parts:[{path:"allMyAppsModel>numberCustomTiles"}],formatter:function(e){return!!e;}},items:[this.oCustomLabel,this.oCustomLink]});this.oCustomPanel.addStyleClass("sapUshellAllMyAppsCustomPanel");q=new P("sapUshellAllMyAppsDetailsPage",{content:[p,this.oItemsContainer,this.oCustomPanel],showHeader:false,enableScrolling:true});this._addCustomData(q,"role","applications");return q;},_afterOpen:function(){if(!this.bAfterOpenHandlerCalled){this.bAfterOpenHandlerCalled=true;if(D.system.desktop){this.getController().initKeyBoardNavigationHandling();}}},_addCustomData:function(I,K,v){I.addCustomData(new A({key:K,value:v,writeToDom:true}));},getControllerName:function(){return"sap.ushell.renderers.fiori2.allMyApps.AllMyApps";}});},false);