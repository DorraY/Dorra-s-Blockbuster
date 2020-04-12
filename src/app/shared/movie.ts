import { Comment } from './comment';

export class Movie {
    id: string
    name: string
    image: string
    category: string
    featured: boolean
    country: string
    year: string
    description: string
    comments: Comment[]  
}