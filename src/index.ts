import express, { Request, Response } from "express";
import cors from "cors";

import {
  users,
  products,
  getProductById,
  queryProductsByName,
  createUser,
  createProduct,
  createPurchase,
  getAllPurchasesFromUserId,
  deleteUser,
  deleteProduct,
  validateCategory,
} from "./database";
import { Category, TProduct, TPurchase, TUser } from "./types";

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
  try {
    res.status(200).send(users);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getAllProducts
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getSearchProductByName
app.get("/product/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (q.length < 1) {
      res.status(400);
      throw new Error("query params deve possuir pelo menos um caractere");
    }
    const result = queryProductsByName(q);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// postCreateUser
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password }: TUser = req.body;
    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400);
      throw new Error("todos os inputs devem ser tipo string");
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
      )
    ) {
      res.status(400);
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }
    const notUniqueUser = users.findIndex((user) => {
      return user.id === id || user.email === email;
    });
    if (notUniqueUser) {
      res.status(406);
      throw new Error(
        "Não é possível criar uma conta com mesmo 'id' ou 'email'!"
      );
    }
    createUser(id, email, name, password);
    res.status(200).send("Usuário criado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// postCreateProduct
app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl, category }: TProduct =
      req.body;
    createProduct(id, name, price, description, imageUrl, category);
    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string" ||
      typeof category !== "string"
    ) {
      res.status(400);
      throw new Error("todos os inputs devem ser tipo correto");
    }
    if (!validateCategory(category)) {
      res.status(400);
      throw new Error("Essa categoria não é válida");
    }
    const notUniqueProduct = products.findIndex((product) => {
      return product.id === id;
    });
    if (notUniqueProduct) {
      res.status(406);
      throw new Error("Não é possível criar um produto com mesmo 'id'!");
    }
    res.status(200).send("Produto criado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//postCreatePurchase
app.post("/purchases", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice }: TPurchase = req.body;
    if (
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof totalPrice !== "number"
    ) {
      res.status(400);
      throw new Error("todos os inputs devem ser do tipo correto");
    }
    const userExist = users.findIndex((user) => {
      return user.id === userId;
    });
    if (!userExist) {
      res.status(404);
      throw new Error("Usuário não encontrado, verifique se já é cadastrado");
    }
    const productExist = products.findIndex((product) => {
      return product.id === productId;
    });
    if (!productExist) {
      res.status(404);
      throw new Error("Produto não encontrado, verifique se já é cadastrado");
    }
    if (products[productExist].price * quantity !== totalPrice) {
      res.status(400);
      throw new Error("Preço total está incorreto");
    }
    createPurchase(userId, productId, quantity, totalPrice);
    res.status(200).send("Compra cadastrada com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// putEditUserById
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error(
        "'id' deve possuir pelo menos um caractere e ser uma string"
      );
    }
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;
    const newName = req.body.name as string | undefined;
    if (!newEmail && !newPassword && !newName) {
      res.status(400);
      throw new Error(
        "para editar um usuário é necessário pelo menos um input"
      );
    }
    const findUser = users.find((user) => {
      return user.id === id;
    });
    if (findUser) {
      findUser.id = id;
      findUser.name = newName || findUser.name;
      findUser.email = newEmail || findUser.email;
      findUser.password = newPassword || findUser.password;
      findUser.createdAt = new Date().toLocaleString();
      res.status(200).send("Atualização realizada com sucesso");
    }
    res.status(400);
    throw new Error("Usuário não encontrado");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// putEditProductById
app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (typeof id !== "string" || id.length < 1) {
    res.status(400);
    throw new Error(
      "'id' deve possuir pelo menos um caractere e ser uma string"
    );
  }
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;
  const newCategory = req.body.category as Category | undefined;
  if (!newName && !newPrice && !newDescription && !newImageUrl &&!newCategory) {
    res.status(400);
    throw new Error(
      "para editar uma compra é necessário informar pelo menos um input"
    );
  }

  const findProduct = products.find((product) => {
    return product.id === id;
  });
  if (findProduct) {
    findProduct.id = id;
    findProduct.name = newName || findProduct.name;
    findProduct.price = newPrice || findProduct.price;
    findProduct.description = newDescription || findProduct.description;
    findProduct.imageUrl = newImageUrl || findProduct.imageUrl;
    findProduct.category = newCategory || findProduct.category;
    res.status(200).send("Atualização realizada com sucesso");
    return;
  }
  res.status(400);
  throw new Error("Produto não encontrado");
});

// DeleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error(
        "'id' deve possuir pelo menos um caractere e ser uma string"
      );
    }
    const userResult = deleteUser(id);
    if (userResult < 0) {
      res.status(404);
      throw new Error("Item não encontrado");
    }
    users.splice(userResult, 1),
      res.status(200).send("Item deletado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// DeleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error(
        "'id' deve possuir pelo menos um caractere e ser uma string"
      );
    }
    const productResult = deleteProduct(id);
    if (productResult < 0) {
      res.status(404);
      throw new Error("Item não encontrado");
    }
    users.splice(productResult, 1);
    res.status(200).send("Item deletado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//getProductsById
app.get("/product/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error(
        "'id' deve possuir pelo menos um caractere e ser uma string"
      );
    }
    const result = getProductById(id);
    if (!result) {
      res.status(404);
      throw new Error("produto não encontrado");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getUserPurchasesbyUserid
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error(
        "'id' deve possuir pelo menos um caractere e ser uma string"
      );
    }
    const result = getAllPurchasesFromUserId(id);
    if (!result) {
      res.status(404);
      throw new Error("compra não realizada ou usuário não existe");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
