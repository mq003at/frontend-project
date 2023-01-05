export interface Common {
    id: number,
    creationAt: string,
    updatedAt: string
}

export interface Category extends Common {
    name: string,
    image: string
}

export interface Product extends Common {
    title: string,
    price: number,
    description: string
    images: string[]
    category: Category
}

