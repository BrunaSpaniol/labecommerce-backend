import { db } from "./database/knex";
import express, { Request, Response } from "express";
import cors from "cors";

import type { TProduct, TPurchaseProducts, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// app.method(path, handler);
// app = constante criada para acessar os recursos do express
// method = constante criada para acessar os recursos do express
// path = - caminho, ou url, que será utilizado para chegar ao endpoint (sempre entre aspas!)
// handler = callback que será acionado ao bater no endpoint. handler(request, response)

// getAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users").select(
      "id",
      "name",
      "email",
      "password",
      "created_at AS createdAt"
    );

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
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
app.post("/users", async (req: Request, res: Response) => {
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

    if (!id || !name || !email || !password) {
      res.status(400);
      throw new Error("Dados inválidos");
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

    const [notUniqueUser] = await db("users").where({ id: id });

    if (!!notUniqueUser) {
      res.status(406);

      throw new Error(
        "Não é possível criar uma conta com mesmo 'id' ou 'email'!"
      );
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
    };

    await db("users").insert(newUser);

    res.status(200).send({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
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
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProduct = req.body;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string"
    ) {
      res.status(400);
      throw new Error("todos os inputs devem ser do tipo correto");
    }

    if (!id || !name || isNaN(price) || !description || !imageUrl) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    const [notUniqueProduct] = await db("products").where({ id: id });

    if (!!notUniqueProduct) {
      res.status(406);
      throw new Error("Não é possível criar um produto com mesmo 'id'!");
    }

    const newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: imageUrl,
    };

    await db.insert(newProduct).into("products");

    res.status(200).send({ message: "Produto criado com sucesso!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
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
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
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
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q.length < 1) {
      res.status(400);
      throw new Error("query params deve possuir pelo menos um caractere");
    }

    const result = await db("products")
      .select()
      .where("name", "LIKE", `%${q}%`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
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
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    if (!newName && !newPrice && !newDescription && !newImageUrl) {
      res.status(400);
      throw new Error(
        "para editar uma compra é necessário informar pelo menos um input"
      );
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 1) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price' deve ser number");
      }

      if (isNaN(newPrice)) {
        res.status(400);
        throw new Error("'price' deve ser um valor válido");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("'description' deve ser string");
      }

      if (newDescription.length < 1) {
        res.status(400);
        throw new Error("'description' deve possuir no mínimo 1 caractere");
      }
    }

    if (newImageUrl !== undefined) {
      if (typeof newImageUrl !== "string") {
        res.status(400);
        throw new Error("'imageUrl' deve ser string");
      }

      if (newImageUrl.length < 1) {
        res.status(400);
        throw new Error("'imageUrl' deve possuir no mínimo 1 caractere");
      }
    }

    const [findProduct] = await db("products").where({ id: id });

    if (!!findProduct) {
      const updatedProduct = {
        id: newId || id,
        name: newName || findProduct.name,
        price: newPrice || findProduct.price,
        description: newDescription || findProduct.description,
        imageUrl: newImageUrl || findProduct.imageUrl,
      };

      await db("products").update(updatedProduct).where({ id: id });

      res.status(200).send({ message: "Atualização realizada com sucesso" });
    } else {
      res.status(400);
      throw new Error("Produto não encontrado");
    }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// CreatePurchase

app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const { id, buyer, products }: any = req.body;

    if (typeof id !== "string" || typeof buyer !== "string") {
      res.status(400);

      throw new Error("todos os inputs devem ser do tipo correto");
    }

    if (!id || !buyer) {
      res.status(400);
      throw new Error("todos os inputs devem ser preenchidos");
    }

    const [purchaseExist] = await db("purchase").where({ id: id });

    if (!!purchaseExist) {
      res.status(400);
      throw new Error("O 'id' da compra já existe");
    }

    const [userExist] = await db("users").where({ id: buyer });

    if (!userExist) {
      res.status(400);
      throw new Error("o usuário não existe");
    }

    let newPurchase = {
      id: id,
      buyer_id: buyer,
      total_price: 0,
    };

    await db.insert(newPurchase).into("purchase");

    const productsDB = await Promise.all(
      products.map(async (product: TPurchaseProducts) => {
        const [productExist] = await db("products").where({
          id: product.product_id,
        });
        newPurchase.total_price += productExist.price * product.quantity;
        await db
          .insert({
            purchase_id: id,
            product_id: productExist.id,
            quantity: product.quantity,
          })
          .into("purchases_products");
        return productExist;
      })
    );

    console.log(productsDB, "produtos promise.all");

    console.log(newPurchase, "new purchase");

    await db.update(newPurchase).into("purchase").where({ id: id });

    res.status(200).send("Compra cadastrada com sucesso!");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//DeletePurchaseByID
app.delete("/purchase/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [isPurchaseExist] = await db("purchase").where({
      id: id,
    });

    if (!isPurchaseExist) {
      res.status(404);
      throw new Error("Compra não cadastrada");
    }

    const isPurchasesProducts = await db("purchases_products").where({
      purchase_id: id,
    });

    if (isPurchasesProducts.length > 0) {
      await db("purchases_products").del().where({
        purchase_id: id,
      });
    }

    await db("purchase").del().where({
      id: id,
    });

    res.status(200).send("Compra deletada com sucesso.");
  } catch (error: any) {
    console.log(error);

    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// GetPurchasesByID
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [isPurchase] = await db("purchase").where({
      id: id,
    });

    if (!isPurchase) {
      res.status(400);
      throw new Error("Compra inexistente!");
    }

    const [getPurchase] = await db("purchase")
      .select(
        "purchase.id AS purchaseId",
        "users.id AS buyerId",
        "users.name AS buyerName",
        "users.email AS buyerEmail",
        "purchase.total_price AS totalPrice",
        "purchase.created_at AS createdAt"
      )
      .where({
        "purchase.id": id,
      })
      .innerJoin("users", "purchase.buyer_id", "=", "users.id");

    const getPurchaseProducts = await db("purchases_products")
      .select()
      .where({
        purchase_id: id,
      })
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      );

    const purchase = {
      ...getPurchase,
      products: getPurchaseProducts,
    };

    res.status(200).send(purchase);
  } catch (error: any) {
    console.log(error);

    if (error.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
