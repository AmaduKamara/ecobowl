export interface Event {
    id: String;
    invoiceNumber: String;
    supplyInvoice: String
    dateSupplied: String;
    totalCost: String;
    items: Array<never>
}

export const newEvent = {
    id: "",
    invoiceNumber: "",
    supplyInvoice: "",
    dateSupplied: "",
    totalCost: "",
    items: []
}