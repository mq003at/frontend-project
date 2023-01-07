export interface ProductProps {
    
}

export interface HeaderButtonProps {
    text: string
}

export interface ProductProps {
    type?: "square" | "circular" | undefined
    id: number
}

export interface uploadProductForm {
    name: string,
    image: File | null
}