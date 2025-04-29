export interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    birthDate: Date,
    gender: 'male' | 'female' | 'other' | '',
    role: 'client' | 'trainer' | '',
    createdAt: Date,
    updatedAt: Date,
}