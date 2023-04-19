import { category, TProduct, TUser } from "./types";

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
    category: category.FOOD,
  },
  {
    id: "sabao124",
    name: "sabão",
    price: 10.0,
    category: category.CLEANING,
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
    userId: users[1].id,
    productId: products[0].id,
    quantity: 5,
    totalPrice: 15,
  },
];

export function createUser(id: string, email: string, password: string) {
  users.push({ id, email, password });
  console.log("Cadastro realizado com sucesso");
  return users;
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
  console.log("Produto criado com sucesso");
}

export function getAllProducts() {
  return products;
}

export function getProductById(idToSearch: string) {
  const searchProduct = products.find((product) => product.id === idToSearch);
  if (searchProduct) {
    console.log("o produto encontrado", searchProduct);
    return;
  }
  console.log("undefined");
}

export function queryProductsByName(q: string) {
  const filteredProducts = products.filter(({ name }) =>
    name.includes(q.toLowerCase())
  );
  console.log(filteredProducts)
  return filteredProducts;
}

export function getAllPurchasesFromUserId(userIdToSearch: string) {
  const filteredPurchases = purchase.filter(
    ({ userId }) => userId === userIdToSearch
  );
  console.log(filteredPurchases)
  return filteredPurchases;
}
