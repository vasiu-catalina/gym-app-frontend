export interface Exercise {
    id: string;
    name: string;
    setNr: number;
    nrReps: number;
    weight: number;
    duration: number;
}

export interface WorkoutLog {
    id: string;
    user: string;
    name: string;
    description: string;
    duration: number;
    date: Date;
    exercises: Exercise[];
}

export interface WorkoutLogPreview {
    id: string;
    user: string;
    name: string;
    description: string;
    duration: number;
    date: Date;
    exercises: number;
}
