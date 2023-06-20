sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Dialog, MessageBox) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: async function () {
                this.getView().setBusy(true);
                debugger

                // se uso il DATA, la funzione addOnPress funziona SIA se fatta con il DATA che con PROPERTY.
                //prodotti
                var oProduct = new sap.ui.model.json.JSONModel();
                var aProduct = await this._getHanaData("/Products");
                // oProduct.setData(aProduct);
                oProduct.setProperty("/", aProduct)
                this.getView().setModel(oProduct, "Products");

                //prodotti
                // var oProduct = new sap.ui.model.json.JSONModel();
                // var aData = await this._getHanaData("/Products");
                // oProduct.setProperty("/Products", aData);
                // this.getView().setModel(oProduct, "Products");

                //clienti
                var oCustomer = new sap.ui.model.json.JSONModel();
                var aData = await this._getHanaData("/Customers");
                oCustomer.setProperty("/Customers", aData);
                this.getView().setModel(oCustomer, "Customers")

                this.getView().setBusy(false);
            },

            _getHanaData: function (Entity) {
                debugger
                var xsoDataModelReport = this.getOwnerComponent().getModel("modelDue");
                return new Promise(
                    function (resolve, reject) {
                        xsoDataModelReport.read(Entity, {
                            success: function (oDataIn, oResponse) {
                                resolve(oDataIn.results);
                            },
                            error: function (error) {
                                reject(console.log("error calling hana DB"))
                            }
                        });
                    });
            },

            //AGGIUNGERE PRODOTTI
            addLineP: async function(e) {
                debugger
                var aProduct = await this._getHanaData("/Products");
                var l = aProduct.length
                console.log(l)
                var Numeroid = `${l +1}`;

                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "project1.view.fragment.DialogAdd"
                    });
                } 
                this.pDialog.then(function(oDialog) {
                    //questa variabile l ho inserita perche non riuscivo a collegarmi al model formsAdd (del component) per inserirgli solo l'id
                    var oModel = new sap.ui.model.json.JSONModel({
                        id: Numeroid,
                        name: "",
                        materials: ""
                    })
                    oDialog.setModel(oModel, "formsAdd")
                    oDialog.open();
                });
            },

            //CHIUSURA DIALOG
            CloseDial: function (oEvent){   
                // this.getView().byId("dialogUno").close()
                oEvent.getSource().getParent().close()
            },

            //AGGIUNTA RECORD
            addOnPress: async function (e) {
                debugger
                var oDialog = e.getSource().getParent() //ALL' EVENTO prendo la sorgente e il parent DEL BOTTONE, ovvero la DIALOG(perche stiamo nella dialog)
                console.log(oDialog)
                var oModel = oDialog.getModel("formsAdd")// mi prendo il modello che ho definito VUOTO nel COMPONENT per l' aggiunta del record
                console.log(oModel)
                var oData = oModel.getData()//mi prendo i dati che sono presente nel modello (dati inseriti da me prima del click del bottone)
                console.log(oData)
                var xsoDataModelReport = this.getOwnerComponent().getModel("modelDue"); //faccio la chiamata al mio model creato nel manifest
                xsoDataModelReport.create("/Products", {id: parseInt(oData.id), name: oData.name , materials: oData.materials},
                {success: function (oDataIn, oResponse) {
                    
                    console.log(oDataIn.results, oResponse)
                    
                },
                error: function (error) {
                    console.log(error)
                }});
                //qui con il CREATE sto dicendo di aggiungere alla tab richiamata(/Products) l' oggetto/dati presi dal model compilato da me.
                    //scrivere uguale a come è stato scritto nel db, altrimenti non lo leggerebbe
                
                //per mostrare a video SENZA dover ricaricare la pagina
                var oProduct = new sap.ui.model.json.JSONModel();
                var aProduct = await this._getHanaData("/Products");
                // oProduct.setData(aProduct);
                oProduct.setProperty("/", aProduct)
                this.getView().setModel(oProduct, "Products");
                // this.getView().getModel("Products").refresh();

                
            },
            
              //cliccare su un record per apertura dialog prendendo quel record
              onRiga: function (oEvent){
                debugger
                var oRiga = oEvent.getSource().getBindingContext("Products").getObject(); //estraggo l' oggetto della riga cliccata
                this.getView().setModel(new sap.ui.model.json.JSONModel(oRiga), "formsAdd"); //setto i dati dell' oggetto nel modello (formsAdd)
                
                if (!this.pDialogDue) {
                    this.pDialogDue = this.loadFragment({
                        name: "project1.view.fragment.DialogUpDel"
                    });
                } 
                this.pDialogDue.then(function(oDialogDue) {
                    oDialogDue.open();
                });

              },

              //per eliminare
              remOnPress: async function(e) {
                debugger
                var selezionato = e.getSource().getParent().getModel("formsAdd").getData();
                var xsoDataModelReport = this.getOwnerComponent().getModel("modelDue");
                var selrem = `/Products(${selezionato.id})`;
                
                xsoDataModelReport.remove(selrem, {
                    success: function() {
                        console.log("Record eliminato con successo!");
                    },
                    error: function(oError) {
                        console.error("Errore durante l'eliminazione del record:", oError);
                    }
                });

                //per mostrare a video SENZA dover ricaricare la pagina
                var oProduct = new sap.ui.model.json.JSONModel();
                var aProduct = await this._getHanaData("/Products");
                // oProduct.setData(aProduct);
                oProduct.setProperty("/", aProduct)
                this.getView().setModel(oProduct, "Products");
                
            },

            //per modificare
            onUpPress: function (e) {
                debugger
                var selezionato = e.getSource().getParent().getModel("formsAdd").getData();
                var xsoDataModelReport = this.getOwnerComponent().getModel("modelDue");
            
                xsoDataModelReport.update(`/Products(${selezionato.id})`, selezionato, {
                    success: async function() {
                        console.log("Record modificato con successo!");
                        this.pDialogDue.then(function (oDialog) {
                            oDialog.close();
                        });
                        var oProduct = new sap.ui.model.json.JSONModel();
                        var aProduct = await this._getHanaData("/Products");
                        
                        oProduct.setProperty("/", aProduct)
                        this.getView().setModel(oProduct, "Products");

                    }.bind(this),
                    error: function (oError) {
                        console.error("Errore durante la modifica del record:", oError);
                    }
                });
                 // Aggiorna la vista dopo la modifica del record
                //  var oProduct = new sap.ui.model.json.JSONModel();
                //  var aProduct = await this._getHanaData("/Products");
                //  // oProduct.setData(aProduct);
                //  oProduct.setProperty("/", aProduct)
                //  this.getView().setModel(oProduct, "Products");
                    

                    // Chiudi la dialog
                    // this.pDialog.then(function (oDialog) {
                    //     oDialog.close();
                    // });
            },

              
        });
    });
