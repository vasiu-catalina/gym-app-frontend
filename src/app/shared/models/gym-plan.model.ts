export interface Exercise {
    id: string;
    name: string;
    nrSets: number;
    nrReps: number;
    duration: number;
}

export interface Day {
    id: string;
    name: string;
    description: string;
    exercises: Exercise[];
}

export interface GymPlan {
    id: string;
    name: string;
    isAiGenerated: boolean;
    description: string;
    startDate: Date;
    endDate: Date;
    nrWeeks: number;
    days: Day[];
}

export interface GymPlanSimple {
    id: string,
    name: string,
    isAiGenerated: boolean,
    description: string,
    startDate: Date,
    endDate: Date,
    nrWeeks: number,
    days: number
};
