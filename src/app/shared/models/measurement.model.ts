export interface Measurement {
    id: string;
    user: string;
    date: Date;
    unit: string;
    value: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum MeasurementType {
    Biceps = 'Biceps',
    Triceps = 'Triceps',
    Forearm = 'Forearm',
    Chest = 'Chest',
    Waist = 'Waist',
    Hips = 'Hips',
    Quads = 'Quads',
    Calf = 'Calf',
    Shoulders = 'Shoulders',
    Back = 'Back',
    Glutes = 'Glutes',
    Abdomen = 'Abdomen',
    Weight = 'Weight',
    Height = 'Height'
}
