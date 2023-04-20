import express, { Request, Response } from "express";
import cors from "cors";

import {
  users,
  products,
  purchase,
  getProductById,
  queryProductsByName,
  createUser,
  createProduct,
  createPurchase,
  getAllPurchasesFromUserId,
  deleteUser,
  deleteProduct,
} from "./database";
import { category, TProduct, TPurchase, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// app.method(path, handler);
// app = constante criada para acessar os recursos do express
// method = constante criada para acessar os recursos do express
// path = - caminho, ou url, que será utilizado para chegar ao endpoint (sempre entre aspas!)
// handler = callback que será acionado ao bater no endpoint. handler(request, response)

// getAllUsers
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

// getAllProducts
app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

// getSearchProductByName
app.get("/product/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = queryProductsByName(q);
  res.status(200).send(result);
});

// postCreateUser
app.post("/users", (req: Request, res: Response) => {
  const { id, email, password }: TUser = req.body;
  createUser(id, email, password);
  res.status(200).send("Usuário criado com sucesso!");
});

// postCreateProduct
app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, category }: TProduct = req.body;
  createProduct(id, name, price, category);
  res.status(200).send("Produto criado com sucesso!");
});

//postCreatePurchase
app.post("/purchases", (req: Request, res: Response) => {
  const { userId, productId, quantity, totalPrice }: TPurchase = req.body;
  createPurchase(userId, productId, quantity, totalPrice);
  res.status(200).send("Compra cadastrada com sucesso!");
});

// putEditUserById
app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const findUser = users.find((user) => {
    return user.id === id;
  });
  if (findUser) {
    (findUser.id = id),
      (findUser.email = newEmail || findUser.email),
      (findUser.password = newPassword || findUser.password);
    res.status(200).send("Atualização realizada com sucesso");
  }
  res.status(400).send("Usuário não encontrado");
});

// putEditProductById
app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as category | undefined;

  const findProduct = products.find((product) => {
    return product.id === id;
  });
  if (findProduct) {
    findProduct.id = id;
    findProduct.name = newName || findProduct.name;
    findProduct.price = newPrice || findProduct.price;
    findProduct.category = newCategory || findProduct.category;
    res.status(200).send("Atualização realizada com sucesso");
    return;
  }
  res.status(400).send("Produto não encontrado");
});

// DeleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const userResult = deleteUser(id);
  userResult < 0
    ? res.status(404).send("Item não encontrado")
    : (users.splice(userResult, 1),
      res.status(200).send("Item deletado com sucesso!"));
});

// DeleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const productResult = deleteProduct(id);
  productResult < 0
    ? res.status(404).send("Item não encontrado")
    : (users.splice(productResult, 1),
      res.status(200).send("Item deletado com sucesso!"));
});

//getProductsById
app.get("/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const result = getProductById(id);
  res.status(200).send(result);
});

// getUserPurchasesbyUserid
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const { id } = req.params;
  const result = getAllPurchasesFromUserId(id);
  res.status(200).send(result);
});
