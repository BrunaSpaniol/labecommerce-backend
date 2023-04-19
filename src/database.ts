import { TProduct, TPurchase, TUser } from "./types";

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

export const purchase : Array<TPurchase> = [
  {
    userId: users[0].id,
    productId: products[1].id,
    quantity: 5,
    get totalPrice(){ return products[1].price* this.quantity}
  },
  {
    userId: users[1].id,
    productId: products[0].id,
    quantity: 5,
    get totalPrice(){ return products[0].price* this.quantity}
  },
];
