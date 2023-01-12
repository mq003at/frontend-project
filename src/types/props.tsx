import { Product } from "./common"
import { User } from "./user"

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
    image: FileList | null
}

export interface ProductPlacementProps {
    size: number
    product: Product
    isOnSale?: boolean
    isHideDescription: boolean
}

export interface ProfileProps {
    currentUser: User;
}