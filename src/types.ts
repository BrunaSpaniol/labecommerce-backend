export type UserId = string;

export type ProductId = string;

export enum category {
  FOOD = "food",
  CLEANING = "cleaning",
  ELECTRONICS = "Eletrônicos",
}

export type TUser = {
  id: UserId;
  email: string;
  password: string;
};

export type TProduct = {
  id: ProductId;
  name: string;
  price: number;
  category: category;
};

export type TPurchase = {
  userId: TUser["id"];
  productId: TProduct["id"];
  quantity: number;
  totalPrice: number;
};
