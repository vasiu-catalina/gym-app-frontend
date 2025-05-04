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




export enum FitnessLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
}

export enum Goal {
    WeightLoss = 'WeightLoss',
    MuscleGain = 'MuscleGain',
    Endurance = 'Endurance',
    Strength = 'Strength',
    Flexibility = 'Flexibility',
    GeneralHealth = 'GeneralHealth'
}

export enum WorkoutType {
    Bodyweight = 'Bodyweight',
    Weights = 'Weights',
    Cardio = 'Cardio',
    Mixed = 'Mixed'
}

export enum TrainingStyle {
    HIIT = 'HIIT',
    Circuit = 'Circuit',
    Traditional = 'Traditional',
    PushPullLegs = 'PushPullLegs',
    FullBody = 'FullBody',
    UpperLower = 'UpperLower'
}


export interface GymPlanAiRequest {

    startDate: Date;
    endDate: Date;
    
    height: number;
    weight: number;

    fitnessLevel: FitnessLevel;

    injuriesOrConditions: string[];

    primaryGoal: Goal;
    secondaryGoals: Goal[];

    workoutDaysPerWeek: number;
    preferredWorkoutDurationMinutes: number;

    availableDays: string[];

    preferredWorkoutType: WorkoutType;
    trainingStyle: TrainingStyle;

    focusMuscleGroups: string[];
    exerciseRestrictions: string[];
    favoriteExercises: string[];
}
