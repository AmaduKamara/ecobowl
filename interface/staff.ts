export interface Staff {
    id: String;
    givenNames: String;
    familyName: String
    gender: String;
    address: String;
    email: String;
    phone: String;
    performances: Array<any>
}

export const newStaff = () :Staff => {
    return {
        id: "",
        givenNames: "",
        familyName: "",
        gender: "",
        address: "",
        email: "",
        phone: "",
        performances: []
    }
}