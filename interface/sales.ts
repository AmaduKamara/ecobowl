export interface Sale {
    id: string;
    invoiceNumber: string;
    salesType: string
    dateSupplied: string;
    paymentType: string;
    discount: string;
    totalCost: string;
    customer: any;
    customerId: String;
    items: Array<any>
}

export const newSale = () :Sale => {
    return {
        id: "",
        invoiceNumber: "",
        salesType: "",
        paymentType: "",
        dateSupplied: "",
        discount: "",
        totalCost: "",
        customer: {},
        customerId: "",
        items: []
    }
}