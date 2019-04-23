/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'./library','./util/DateUtils','sap/ui/commons/library','sap/ui/commons/Label','sap/ui/commons/RangeSlider','sap/ui/core/format/DateFormat','sap/ui/commons/Slider',"sap/base/Log"],function(q,l,D,C,L,R,a,S,b){"use strict";var c=R.extend("sap.suite.ui.commons.DateRangeSliderInternal",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{showBubbles:{type:"boolean",group:"Misc",defaultValue:true},pinGrip:{type:"boolean",group:"Misc",defaultValue:false},pinGrip2:{type:"boolean",group:"Misc",defaultValue:false}},events:{change:{},liveChange:{}}}});var d=12;var e="d";var M="m";c.prototype.init=function(){this.setSmallStepWidth(1);this._sGranularity=e;this._oDateFormat=null;var m=new Date();this._dMinDate=D.incrementDateByIndex(m,-365);if(!this.getTotalUnits()){this.setTotalUnits(d);}this.setMin(0);this.setMax(365);this.setValue(0);this.setValue2(365);var t=(this.getLabels()&&this.getLabels().length>0);this._bUsingDefaultLabels=this.getStepLabels()&&!t;if(this._bUsingDefaultLabels){c.createRailLabels(this);}if(this.getShowBubbles()){this._oBubble=new L({id:this.getId()+'-bubbleTxt'});this._oBubble2=new L({id:this.getId()+'-bubbleTxt2'});this._oBubble.addStyleClass("sapSuiteUiCommonsDateRangeSliderBubbleLblTxt");this._oBubble2.addStyleClass("sapSuiteUiCommonsDateRangeSliderBubbleLblTxt");this._oBubble.setText(this.getFormattedDate(this.getValueDate()));this._oBubble2.setText(this.getFormattedDate(this.getValue2Date()));}};c.prototype.setVertical=function(v){b.error("DateRangeSliderInternal.setVertical method is not yet supported!");};c.prototype.setHeight=function(h){b.error("DateRangeSliderInternal.setHeight method is not yet supported!");};c.createRailLabels=function(o){var r=[];var t=o.getTotalUnits();var s=(o.getMax()-o.getMin())/t;for(var i=0;i<=t;i++){var f=Math.round(parseFloat(o.getMin()+i*s));if(f>o.getMax()){f=o.getMax();}var T=null;if(o._sGranularity===e){T=D.incrementDateByIndex(o.getMinDate(),f);}else if(o._sGranularity===M){T=D.incrementMonthByIndex(o.getMinDate(),f);}r[i]=o.getFormattedDate(T);}o.setProperty("labels",r);return r;};c.repositionBubbles=function(o){var g=o.getId()+'-grip';var G=g?window.document.getElementById(g):null;var s=G.style.left;var f=s.substring(0,s.length-2);var i=parseInt(f,10);var h=o.getId()+'-grip2';var j=h?window.document.getElementById(h):null;var k=j.style.left;var m=k.substring(0,k.length-2);var n=parseInt(m,10);var B=o.getId()+'-bubble';var p=B?window.document.getElementById(B):null;var r=o.getId()+'-bubble2';var t=r?window.document.getElementById(r):null;var u=null,v=null;var w=p.style.left;if(w){u=w.substring(0,w.length-2);}var x=t.style.left;if(x){v=x.substring(0,x.length-2);}var W=q(p).css("width");var y=parseInt(W,10);var z=41;if(((i+y)<n)||(!u&&!v)){p.style.left=(i-z)+"px";t.style.left=(n-z)+"px";}if(sap.ui.getCore().getConfiguration().getRTL()&&((n+y)<i)){p.style.left=(i-z)+"px";t.style.left=(n-z)+"px";}var V=o.getFormattedDate(o.getValueDate());var A=o.getFormattedDate(o.getValue2Date());o._oBubble.setText(V);o._oBubble2.setText(A);if(o.isActive()){o._oBubble.rerender();o._oBubble2.rerender();}};c.prototype.changeGrip=function(n,N,g){S.prototype.changeGrip.apply(this,arguments);if(!isNaN(n)){var i=Math.round(n);var t=null;if(this._sGranularity===e){t=D.incrementDateByIndex(this._dMinDate,i);}else if(this._sGranularity===M){t=D.incrementMonthByIndex(this._dMinDate,i);}g.title=this.getFormattedDate(t);}};c.prototype.setAriaState=function(){var f=this.getFormattedDate(this.getValueDate());var g=this.getFormattedDate(this.getValue2Date());if(this.oMovingGrip===this.oGrip){this.oMovingGrip.setAttribute('aria-valuetext',f);this.oMovingGrip.setAttribute('aria-valuenow',this.getValue());this.oGrip2.setAttribute('aria-valuemin',f);}else{this.oMovingGrip.setAttribute('aria-valuetext',g);this.oMovingGrip.setAttribute('aria-valuenow',this.getValue2());this.oGrip.setAttribute('aria-valuemax',g);}};c.prototype.getFormattedDate=function(f){var F=null;switch(this._sGranularity){case(e):F=this._oDateFormat||a.getDateInstance({style:"medium"});break;case(M):F=this._oDateFormat||a.getDateInstance({pattern:'MMM YYYY'});break;default:break;}return F.format(f);};c.updateLabelBubbleToolTipValues=function(o){if(o._bUsingDefaultLabels){c.createRailLabels(o);}if(o.getShowBubbles()){var v=o.getFormattedDate(o.getValueDate());var V=o.getFormattedDate(o.getValue2Date());o._oBubble.setText(v);o._oBubble2.setText(V);}};c.prototype.getDateFormat=function(){return this._oDateFormat;};c.prototype.setDateFormat=function(o){if(o&&o instanceof a){this._oDateFormat=o;}else{this._oDateFormat=null;}c.updateLabelBubbleToolTipValues(this);};c.prototype.getDateRange=function(){var v=this.getValueDate();var V=this.getValue2Date();var o={valueDate:v,value2Date:V};return o;};c.prototype.handleFireChange=function(){if(this.getShowBubbles()){c.repositionBubbles(this);}var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});this.fireLiveChange({value:r.valueDate,value2:r.value2Date});};c.prototype.handleFireChangeWithoutLive=function(){if(this.getShowBubbles()){c.repositionBubbles(this);}var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});};c.prototype.fireLiveChangeForGrip=function(g,n,o){if(this.getShowBubbles()&&o!==n){c.repositionBubbles(this);}var r;if(g===this.oGrip){if(o!==n){r=this.getDateRange();this.fireLiveChange({value:r.valueDate,value2:r.value2Date});}}else if(g===this.oGrip2){if(o!==n){r=this.getDateRange();this.fireLiveChange({value:r.valueDate,value2:r.value2Date});}}};c.prototype.onAfterRendering=function(){R.prototype.onAfterRendering.apply(this);if(this.getShowBubbles()){c.repositionBubbles(this);}};c.prototype.onresize=function(E){R.prototype.onresize.apply(this,arguments);if(this.getDomRef()){if(this.getShowBubbles()){c.repositionBubbles(this);}}};c.prototype.setStepLabels=function(s){this.setProperty("stepLabels",s);if(s===true){var t=(this.getLabels()&&this.getLabels().length>0);if(!t){c.createRailLabels(this);this._bUsingDefaultLabels=true;}}};c.prototype.setLabels=function(f){this.setProperty("labels",f);var t=(this.getLabels()&&this.getLabels().length>0);if(this.getStepLabels()&&!t){c.createRailLabels(this);this._bUsingDefaultLabels=true;}};c.prototype.setSmallStepWidth=function(s){this.setProperty("smallStepWidth",Math.round(s));};c.prototype.setTotalUnits=function(t){this.setProperty("totalUnits",t);if(this._bUsingDefaultLabels){c.createRailLabels(this);}};c.prototype.getMaxDate=function(){var m=null;switch(this._sGranularity){case(e):m=D.incrementDateByIndex(this._dMinDate,this.getMax());D.resetDateToEndOfDay(m);break;case(M):m=D.incrementMonthByIndex(this._dMinDate,this.getMax());D.resetDateToEndOfMonth(m);break;default:break;}return m;};c.prototype.setMaxDate=function(m){var f=this.getMinDate();var v=this.getValueDate();var V=this.getValue2Date();var F=false;var n=0,N=0,i=0;switch(this._sGranularity){case(e):n=D.numberOfDaysApart(f,m);N=D.numberOfDaysApart(f,v);i=D.numberOfDaysApart(f,V);break;case(M):n=D.numberOfMonthsApart(f,m);N=D.numberOfMonthsApart(f,v);i=D.numberOfMonthsApart(f,V);break;default:break;}F=N>n||i>n;N=N>n?n:N;i=i>n?n:i;this.setProperty('min',0,true);this.setProperty('max',n,true);this.setProperty('value',N,true);this.setProperty('value2',i,true);if(this._bUsingDefaultLabels){c.createRailLabels(this);}if(F){var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});}};c.prototype.getMinDate=function(){var m=new Date(this._dMinDate);switch(this._sGranularity){case(e):D.resetDateToStartOfDay(m);break;case(M):D.resetDateToStartOfMonth(m);break;default:break;}return m;};c.prototype.setMinDate=function(m){var f=this.getMaxDate();var v=this.getValueDate();var V=this.getValue2Date();this._dMinDate=new Date(m);var F=false;var n=0,N=0,i=0;switch(this._sGranularity){case(e):n=D.numberOfDaysApart(m,f);N=D.numberOfDaysApart(m,v);i=D.numberOfDaysApart(m,V);break;case(M):n=D.numberOfMonthsApart(m,f);N=D.numberOfMonthsApart(m,v);i=D.numberOfMonthsApart(m,V);break;default:break;}F=N<0||i<0;N=N<0?0:N;i=i<0?0:i;this.setProperty('min',0,true);this.setProperty('max',n,true);this.setProperty('value',N,true);this.setProperty('value2',i,true);if(this._bUsingDefaultLabels){c.createRailLabels(this);}if(F){var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});}};c.prototype.getValue2Date=function(){var v=null;switch(this._sGranularity){case(e):v=D.incrementDateByIndex(this._dMinDate,this.getValue2());D.resetDateToEndOfDay(v);break;case(M):v=D.incrementMonthByIndex(this._dMinDate,this.getValue2());D.resetDateToEndOfMonth(v);break;default:break;}return v;};c.prototype.setValue2Date=function(v){var n=0;switch(this._sGranularity){case(e):n=D.numberOfDaysApart(this._dMinDate,v);break;case(M):n=D.numberOfMonthsApart(this._dMinDate,v);break;default:break;}this.setProperty('value2',n,true);var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});};c.prototype.getValueDate=function(){var v;switch(this._sGranularity){case(e):v=D.incrementDateByIndex(this._dMinDate,this.getValue());D.resetDateToStartOfDay(v);break;case(M):v=D.incrementMonthByIndex(this._dMinDate,this.getValue());D.resetDateToStartOfMonth(v);break;default:break;}return v;};c.prototype.setValueDate=function(v){var n=0;switch(this._sGranularity){case(e):n=D.numberOfDaysApart(this._dMinDate,v);break;case(M):n=D.numberOfMonthsApart(this._dMinDate,v);break;default:break;}this.setProperty('value',n,true);var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});};c.prototype.setDayGranularity=function(){var m=this.getMinDate();var v=this.getValueDate();var V=this.getValue2Date();var f=this.getMaxDate();var n=D.numberOfDaysApart(m,v);var N=D.numberOfDaysApart(m,V);var i=D.numberOfDaysApart(m,f);this.setProperty('min',0,true);this.setProperty('value',n,true);this.setProperty('value2',N,true);this.setProperty('max',i,true);this._sGranularity=e;if(this._bUsingDefaultLabels){c.createRailLabels(this);}var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});};c.prototype.setMonthGranularity=function(){var m=this.getMinDate();var v=this.getValueDate();var V=this.getValue2Date();var f=this.getMaxDate();var n=D.numberOfMonthsApart(m,v);var N=D.numberOfMonthsApart(m,V);var i=D.numberOfMonthsApart(m,f);this.setProperty('min',0,true);this.setProperty('value',n,true);this.setProperty('value2',N,true);this.setProperty('max',i,true);this._sGranularity=M;D.resetDateToStartOfMonth(this._dMinDate);if(this._bUsingDefaultLabels){c.createRailLabels(this);}var r=this.getDateRange();this.fireChange({value:r.valueDate,value2:r.value2Date});};c.prototype.handleMove=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.handleMove.apply(this,[E]);}};c.prototype.onsapend=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.onsapend.apply(this,[E]);}};c.prototype.onsaphome=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.onsaphome.apply(this,[E]);}};c.prototype.onsaprightmodifiers=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.onsaprightmodifiers.apply(this,[E]);}};c.prototype.onsapleftmodifiers=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.onsapleftmodifiers.apply(this,[E]);}};c.prototype.onsapright=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.onsapright.apply(this,[E]);}};c.prototype.onsapleft=function(E){if((this.oMovingGrip===this.oGrip2&&!this.getPinGrip2())||(this.oMovingGrip===this.oGrip&&!this.getPinGrip())){R.prototype.onsapleft.apply(this,[E]);}};c.prototype.onclick=function(E){var m=this.oMovingGrip;if(this.getEditable()&&this.getEnabled()){var f;var s=E.target.getAttribute('ID');var n=this.getValue();var N=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;switch(s){case(this.oBar.id):case(this.oHiLi.id):if(this.getVertical()){f=this.getBarWidth()-this.getOffsetX(E);}else{f=this.getOffsetX(E);}if(s===this.oHiLi.id){if(this.getVertical()){f-=this.getOffsetLeft(this.oHiLi);}else{f+=this.getOffsetLeft(this.oHiLi);}}n=this.convertRtlValue(this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*f));N=this.getOffsetX(E);if(s===this.oHiLi.id){N+=this.getOffsetLeft(this.oHiLi);}if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget;}else if(this.targetIsGrip(s)){m=E.target;}else{m=this.getNearestGrip(N);}break;case(this.getId()+'-left'):N=0;if(this.getVertical()){n=this.getMax();m=this.getRightGrip();}else{n=this.getMin();m=this.getLeftGrip();}break;case(this.getId()+'-right'):N=this.getBarWidth();if(!this.getVertical()){n=this.getMax();m=this.getRightGrip();}else{n=this.getMin();m=this.getLeftGrip();}break;default:if(this.targetIsGrip(s)){return;}var t=s.search('-tick');if(t>=0){var T=parseInt(s.slice(this.getId().length+5),10);N=this.fTickDist*T;n=this.convertRtlValue(this.getMin()+(((this.getMax()-this.getMin())/this.getTotalUnits())*T));if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget;}else if(this.targetIsGrip(s)){m=E.target;}else{m=this.getNearestGrip(N);}break;}var o=q(this.oBar).offset();var O=q(E.target).offset();if(this.getVertical()){N=this.getOffsetX(E)-(o.top-O.top);}else{N=this.getOffsetX(E)-(o.left-O.left);}if(N<=0){N=0;if(this.getVertical()){n=this.getMax();}else{n=this.getMin();}}else if(N>=this.getBarWidth()){N=this.getBarWidth();if(this.getVertical()){n=this.getMin();}else{n=this.getMax();}}else{if(this.getVertical()){f=this.getBarWidth()-N;}else{f=N;}n=this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*f);}n=this.convertRtlValue(n);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget;}else if(this.targetIsGrip(s)){m=E.target;}else{m=this.getNearestGrip(N);}break;}if((m===this.oGrip2&&this.getPinGrip2())||(m===this.oGrip&&this.getPinGrip())){return;}var v=this.validateNewPosition(n,N,m,(this.getValueForGrip(m)>n));n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,m);this.handleFireChange();}m.focus();this.oMovingGrip=m;this.oStartTarget=null;};c.prototype.onkeydown=function(E){this.oMovingGrip.setAttribute('aria-busy','true');};c.prototype.onkeyup=function(E){this.oMovingGrip.setAttribute('aria-busy','false');};return c;});