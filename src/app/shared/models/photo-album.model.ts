export interface Image {
    id: string;
    filename: string;
    date: Date;
}

export interface Album {
    id: string;
    name: string;
    user: string;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
}