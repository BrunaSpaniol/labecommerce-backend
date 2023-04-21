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
  description: string,
  imageUrl: string,
  category: Category;
};

export type TPurchase = {
  userId: TUser["id"];
  productId: TProduct["id"];
  quantity: number;
  totalPrice: number;
};
