import { Institution, newInstitution } from "./institution";

export interface Reward {
    id: String;
    name: String;
    description: String;
    position: string;
    eventId: String;
}

export const newReward: Reward = {
    id: "",
    name: "",
    description: "",
    position: "",
    eventId: ""
}

export interface Event {
    id: String;
    name: String;
    description: String
    startDate: String;
    endDate: String;
    institution: Institution;
    rewards: Array<Reward>;
}

export const newEvent: Event = {
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    institution: newInstitution,
    rewards: []
}