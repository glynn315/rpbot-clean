export interface Message {
    role: string;
    content: string;
}

export interface Conversation {
    applicant_i_information_id: number;
    messages: Message[];
    care?: number;
    ambition?: number;
    influence?: number;
    skillsDevelopment?: number;
    technicalSkills?: number;
    discipline?: number;
    commentary?: string;
}
