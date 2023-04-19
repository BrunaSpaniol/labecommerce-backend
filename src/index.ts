import {
  users,
  products,
  purchase,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  getAllPurchasesFromUserId,
} from "./database";
import { category } from "./types";

console.log("users", users, "products", products, "purchase", purchase);

function executeTest(){
createUser('bruna', 'email@email.com', 'aaa')
getAllUsers()
createProduct('05', 'torrada', 5.0, category.FOOD)
getAllProducts()
getProductById('05')
getProductById('100')
queryProductsByName('p')
getAllPurchasesFromUserId('124')
}
executeTest()