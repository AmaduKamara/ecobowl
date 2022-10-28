export interface Event {
    id: String;
    name: String;
    description: String
    dateSupplied: String;
    totalCost: String;
    items: Array<never>
}

export const newEvent = {
    id: "",
    name: "",
    description: "",
    dateSupplied: "",
    totalCost: "",
    items: []
}