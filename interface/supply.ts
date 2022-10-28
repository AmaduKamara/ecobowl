export interface Supply {
    id: String;
    invoiceNumber: String;
    supplyInvoice: String
    dateSupplied: String;
    totalCost: String;
    items: Array<never>
}

export const newSupply = () :Supply => {
    return {
        id: "",
        invoiceNumber: "",
        supplyInvoice: "",
        dateSupplied: "",
        totalCost: "",
        items: []
    }
}