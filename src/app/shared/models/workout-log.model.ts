export interface WorkoutSet {
    id: string,
    setNr: number;
    nrReps: number;
    weight: number;
    duration: number;
    completed: boolean;
}

export interface WorkoutLogExercise {
    id: string;
    name: string;
    sets: WorkoutSet[];

}

export interface WorkoutLog {
    id: string;
    user: string;
    name: string;
    description: string;
    duration: number;
    date: Date;
    exercises: WorkoutLogExercise[];
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




