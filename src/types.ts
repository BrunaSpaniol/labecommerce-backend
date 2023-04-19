export enum category{
    FOOD = "food",
    CLEANING = "cleaning",
    ELECTRONICS = "Eletrônicos"
}

export type TUser = {
    id: string;
    email: string;
    password: string
}

export type TProduct = {
    id: string;
    name: string;
    price: number;
    category:category;
}


export type TPurchase = {
    userId: TUser['id'];
    productId: TProduct['id'];
    quantity: number;
    totalPrice: number
}