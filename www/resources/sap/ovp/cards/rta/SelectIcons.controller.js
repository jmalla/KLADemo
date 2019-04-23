sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(q,C,F,a){'use strict';return C.extend("sap.ovp.cards.rta.SelectIcons",{onInit:function(){},onAfterRendering:function(){},_filterTable:function(e,f,I){var Q=e.getParameter("query"),g=null,b=[];for(var i=0;i<f.length;i++){b.push(new F(f[i],a.Contains,Q));}if(Q){g=new F(b,false);}this.getView().byId(I).getBinding("items").filter(g,"Application");},filterTable:function(e){var v=this.getView(),m=v.getModel(),t=m.getProperty("/tableName"),l;if(t==="IconTable"){this._filterTable(e,["Icon","Name"],"IconTable");l=v.byId("IconTable").getBinding("items").getLength();m.setProperty("/NoOfIcons",l);}else if(t==="ImageTable"){this._filterTable(e,["Name"],"ImageTable");l=v.byId("ImageTable").getBinding("items").getLength();m.setProperty("/NoOfImages",l);}m.refresh(true);},onItemPress:function(e){var s=e.getSource(),S=s.getBindingContext(),m=this.getView().getModel(),t=m.getProperty("/tableName"),u;if(t==="IconTable"){u=S.getProperty("Icon");}else if(t==="ImageTable"){u=S.getProperty("Image");}this.updateIconPath(u);},onSelectionChange:function(e){var k=e.getParameter("item").getKey(),m=this.getView().getModel();m.setProperty("/tableName",k);m.refresh(true);}});});