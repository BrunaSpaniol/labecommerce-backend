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
} from "./database";
import { TProduct, TPurchase, TUser } from "./types";

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
