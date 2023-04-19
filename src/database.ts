import { TProduct, TUser } from "./types";

export const users: Array<TUser> = [
  {
    id: "123",
    email: "user123@email.com",
    password: "senha123",
  },
  {
    id: "124",
    email: "user124@email.com",
    password: "senha124",
  },
];

export const products: Array<TProduct> = [
  {
    id: "pao123",
    name: "pao",
    price: 5.0,
    category: "food",
  },
  {
    id: "sabao124",
    name: "sabão",
    price: 10.0,
    category: "cleaning",
  },
];

export const purchase = [
  {
    userId: users[0].id,
    productId: products[1].id,
    quantity: 5,
    totalPrice: products[1].price * 5,
  },
  {
    userId: "125",
    productId: "manteiga",
    quantity: 5,
    totalPrice: 15,
  },
];
