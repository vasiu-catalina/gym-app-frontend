export interface Image {
    id: string;
    filename: string;
    date: Date;
    error: boolean
}

export interface PhotoAlbum {
    id: string;
    name: string;
    user: string;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
}