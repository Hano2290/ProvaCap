using { prova.db as myCriDb } from '../db/schema';
//prova.db è il nome dello schema/tabella su schema.cds e gli assegno un ALIAS per estrarlo ogni volta
//cosi facendo do un entita alla mia tabella

service CristianoService {
//il service lo possiamo chiamare come vogliamo.
    entity CristianoProvaTabella as projection on myCriDb.TabellaProva;
    //nome come voglio, fa riferimento alla tabella che ho creato in schema.cds (passare l' alias del db e il nome della tabella)
    entity AltraTab as projection on myCriDb.AltraTabella;

    entity Customers as projection on myCriDb.TabCustomers;

    entity  Products as projection on myCriDb.TabProducts;

}


