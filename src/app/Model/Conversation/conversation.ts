export interface Message {
    role: string;
    content: string;
}

export interface Conversation {
    applicant_i_information_id: number;
    messages: Message[];
}
