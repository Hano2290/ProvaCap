using { sap } from '@sap/cds/common';

namespace prova.db;

entity TabellaProva{
    key id: Int16;
        name: String(50);
        Date: Timestamp;
}

entity AltraTabella {
    key id: Int16;
        campo: String(20);
        Date: Timestamp;
    
}

entity TabCustomers {
    key id: Int16;
        name: String(20);
        address: String(30)
}

entity TabProducts {
    key id: Int16;
        name: String(20);
        materials: String(30)
}