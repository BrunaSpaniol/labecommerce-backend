import { category, TProduct, TPurchase, TUser } from "./types";

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
    price: 5,
    category: category.FOOD,
  },
  {
    id: "sabao124",
    name: "sabão",
    price: 10,
    category: category.CLEANING,
  },
];

export const purchase: Array<TPurchase> = [
  {
    userId: "123",
    productId: products[1].id,
    quantity: 5,
    totalPrice: 25,
  },
  {
    userId: "124",
    productId: products[1].id,
    quantity: 5,
    totalPrice: 50,
  },
];

export function createUser(id: string, email: string, password: string) {
  users.push({ id, email, password });
}

export function getAllUsers() {
  return users;
}

export function createProduct(
  id: string,
  name: string,
  price: number,
  category: category
) {
  products.push({ id, name, price, category });
}

export function getAllProducts() {
  return products;
}

export function getProductById(idToSearch: string) {
  const searchProduct = products.find((product) => product.id === idToSearch);
  if (searchProduct) {
    console.log("objeto product encontrado")
    return searchProduct; 
  }
  console.log("undefined");
}

export function queryProductsByName(q: string) {
  return products.filter(({ name }) => {
    return name.toLowerCase().includes(q.toLowerCase());
  });
}

export function createPurchase(
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
) {
  purchase.push({ userId, productId, quantity, totalPrice });
}

export function getAllPurchasesFromUserId(userIdToSearch: string) {
  const filteredPurchases = purchase.filter(({ userId }) => {
    return userId === userIdToSearch;
  });
  if (filteredPurchases) {
    console.log("objeto array de compras do user procurado encontrado");
    return filteredPurchases;
  }
  return undefined;
}

export function deleteUser(userIdToDelete: string){
  return users.findIndex(({id}) => {
    return id === userIdToDelete;
  });
}

export function deleteProduct(productIdToDelete: string){
  return products.findIndex(({id}) => {
    return id === productIdToDelete;
  });
}