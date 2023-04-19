export type UserId = string

export type ProductId= string;

export type TUser = {
    id: UserId;
    email: string;
    password: string
}

export type TProduct = {
    id: ProductId;
    name: string;
    price: number;
    category:string
}


export type TPurchase = {
    userId: TUser['id'];
    productId: TProduct['id'];
    quantity: number;
    totalPrice: number
}