
/*
return Controller.extend("project1.controller.View1", {
            onInit: async function () {
                this.getView().setBusy(true);
                debugger

                // se uso il DATA, la funzione addOnPress funziona SIA se fatta con il DATA che con PROPERTY.
                //prodotti
                var oProduct = new sap.ui.model.json.JSONModel();
                var aProduct = await this._getHanaData("/Products");
                oProduct.setData(aProduct);
                this.getView().setModel(oProduct, "Products");

                mi crea vari problemi con l' uso di property. non mi funziona l' update ad esempio.

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
                var xsoDataModelReport = this.getOwnerComponent().getModel("modelDue");  --> xsoDataModelReport è una var che mi contiene il collegamento al manifest (getOwnerComponet) e prende il mio modello (getModel("modelDue"))
                come dire: collegati al manifest e prendi il mio modello al cui interno passo il collegamento al server (uri)
                return new Promise(
                    function (resolve, reject) {
                        xsoDataModelReport.read(Entity, {  --> è con il read che vado in lettura della entity sul server
                            success: function (oDataIn, oResponse) {
                                resolve(oDataIn.results);
                            },
                            error: function (error) {
                                reject(console.log("error calling hana DB"))
                            }
                        });
                    });
            },


            //PRIRE DIALOG
            addLineP: function() {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "project1.view.fragment.DialogAdd"
                    });
                } 

                nel blocco sopra sto dicendo che se NON è aperta pDialog, allora fai carichi la fragment e dentro passi il nome del percorso in cui va a trovare la fragment/dialog

                DOPO aver controllato con non lo sia, la si apre
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });


            },

            //CHIUSURA DIALOG
            CloseDial: function (oEvent){   
                
                oEvent.getSource().getParent().close()
            },


            //AGGIUNTA RECORD
            addOnPress: async function (e) {
                debugger
                var oDialog = e.getSource().getParent()  //ALL' EVENTO prendo la sorgente e il parent DEL BOTTONE, ovvero la DIALOG(perche stiamo nella dialog)
                console.log(oDialog)
                var oModel = oDialog.getModel("formsAdd")  // mi prendo il modello che ho definito VUOTO nel COMPONENT per l' aggiunta del record
                console.log(oModel)
                var oData = oModel.getData()  //mi prendo i dati che sono presente nel modello (dati inseriti da me prima del click del bottone)
                console.log(oData)
                var xsoDataModelReport = this.getOwnerComponent().getModel("modelDue");   //faccio la chiamata al mio model creato nel manifest
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
                oProduct.setData(aProduct);
                this.getView().setModel(oProduct, "Products");
                

                // this.getView().getModel("Products").refresh(); NON mi funziona!

            },

            
            appunti dialog
            avevo il problema che se apro una dialog, che fa una cosa e la chiudo, POI ne apro una seconda che fa un altra cosa
            ma riapre sempre la prima. e viceversa. in pratica o facevo una cosa o l' altra.
            ho risolto cambiando il nome delle dialog nelle variabili.
            es: prima dialog
                    if (!this.pDialog) { XXX
                    });
                } 
            
            es: seconda dialog
                if (!this.pDialogDue) { XXX
                    });
                } 







*/