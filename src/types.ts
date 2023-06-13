export type UserId = string;

export type ProductId = string;

export enum Category {
  FOOD = "food",
  CLEANING = "cleaning",
  ELECTRONICS = "eletrônicos",
}

export type TUser = {
  id: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export type TProduct = {
  id: ProductId;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type TPurchase = {
  id: string;
  buyer: string;
  totalPrice?: number;
  createdAt?: number;
  paid?: number;
  products: TPurchaseProducts[];
};

export type TPurchaseProducts = {
  id: string;
  quantity: number;
};

export type TPurchaseProductsComplete = {
  id: TPurchase["id"];
  product_id: TProduct["id"];
  quantity: number;
};
