import { Category, TProduct, TPurchase, TUser } from "./types";

export const users: Array<TUser> = [
  {
    id: "123",
    name: "regina",
    email: "user123@email.com",
    password: "senha123",
    created_at: new Date().toLocaleString(),
  },
  {
    id: "124",
    name: "Gabi",
    email: "user124@email.com",
    password: "senha124",
    created_at: new Date().toLocaleString(),
  },
];

export const products: Array<TProduct> = [
  {
    id: "pao123",
    name: "pao",
    price: 5,
    description: "string",
    imageUrl: "string",
    category: Category.FOOD,
  },
  {
    id: "sabao124",
    name: "sabão",
    price: 10,
    description: "string",
    imageUrl: "string",
    category: Category.CLEANING,
  },
];

// export const purchase: Array<TPurchase> = [
//   {
//     userId: "123",
//     productId: products[1].id,
//     quantity: 5,
//     totalPrice: 25,
//   },
//   {
//     userId: "124",
//     productId: products[1].id,
//     quantity: 5,
//     totalPrice: 50,
//   },
// ];

export function createUser(
  id: string,
  name: string,
  email: string,
  password: string
) {
  users.push({
    id,
    email,
    name,
    password,
    created_at: new Date().toLocaleString(),
  });
}

export function getAllUsers() {
  return users;
}

export function createProduct(
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string,
  category: Category
) {
  products.push({ id, name, price, description, imageUrl, category });
}

export function getAllProducts() {
  return products;
}

export function getProductById(idToSearch: string) {
  const searchProduct = products.find((product) => product.id === idToSearch);
  if (searchProduct) {
    console.log("objeto product encontrado");
    return searchProduct;
  }
  console.log("undefined");
}

export function queryProductsByName(q: string) {
  return products.filter(({ name }) => {
    return name.toLowerCase().includes(q.toLowerCase());
  });
}

// export function createPurchase(
//   userId: string,
//   productId: string,
//   quantity: number,
//   totalPrice: number
// ) {
//   purchase.push({ userId, productId, quantity, totalPrice });
// }

// export function getAllPurchasesFromUserId(userIdToSearch: string) {
//   const filteredPurchases = purchase.filter(({ userId }) => {
//     return userId === userIdToSearch;
//   });
//   if (filteredPurchases) {
//     console.log("objeto array de compras do user procurado encontrado");
//     return filteredPurchases;
//   }
//   return undefined;
// }

// export function deleteUser(userIdToDelete: string) {
//   return users.findIndex(({ id }) => {
//     return id === userIdToDelete;
//   });
// }

// export function deleteProduct(productIdToDelete: string) {
//   return products.findIndex(({ id }) => {
//     return id === productIdToDelete;
//   });
// }
// export function validateCategory(value: string) {
//   let isCategory = false;
//   for (let type in Category) {
//     if (type === value) {
//       isCategory = true;
//     }
//   }
//   return isCategory;
// }
