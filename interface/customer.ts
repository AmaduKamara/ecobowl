export interface Customer {
    id: String;
    givenNames: String;
    familyName: String
    gender: String;
    address: String;
    company: String;
    email: String;
    phone: String;
    purchases: Array<any>
}

export const newCustomer = {
    id: "",
    givenNames: "",
    familyName: "",
    gender: "",
    address: "",
    email: "",
    company: "",
    phone: "",
    purchases: []
}