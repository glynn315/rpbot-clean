import { Job } from "../../Model/Job/job";

export const Jobs:Job[] =[
    {
        role: 'IT Staff',
        qualifications: [
            'A degree in Information Technology or a related field',
            'Working knowledge of database systems',
            'Familiar with the System Development Life Cycle(SDLC)',
            'Experience in preparing structures Reports',
        ],
        salaryBudget: 18000
    },
    {
        role: 'HR Staff',
        qualifications: [
            'A degree in Human Resource Management, Psychology, Business Administration, or a related field',
            'Knowledge of HR processes such as recruitment, onboarding, and payroll',
            'Familiarity with labor laws and employment standards',
            'Strong communication and interpersonal skills',
            'Proficient in MS Office and HRIS systems (an advantage)',
            'Detail-oriented and able to handle confidential information'
        ],
        salaryBudget: 16000
    },
    {
        role: 'Planning Staff',
        qualifications: [
            'Civil Engineering Graduate',
            'With Drivers License',
            'Proficiency in AutoCAD, SketchUp, or other drawing software',
            'Knowledge of basic engineering and architectural drafting standard',
            'Ability to read and interpret blueprints, plans, and technnical drawings',
            'Experience in fieldwork is an advantage'
        ],
        salaryBudget: 18000
    }
]