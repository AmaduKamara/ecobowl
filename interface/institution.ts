export interface ContactPerson {
    name: string;
    phone: string;
}

export interface Institution {
    id: String;
    name: String;
    description: String;
    contactPerson: ContactPerson;
}

export const newInstitution = {
    id: "",
    name: "",
    description: "",
    contactPerson: {
        name: "",
        phone: ""
    }
}