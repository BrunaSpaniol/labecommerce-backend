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
  created_at: string;
};

export type TProduct = {
  id: ProductId;
  name: string;
  price: number;
  description: string,
  imageUrl: string,
  category: Category;
};

export type TPurchase = {
  id: string;
  buyer: string;
  totalPrice: number;
  createdAt?: number;
  paid: number;
};
