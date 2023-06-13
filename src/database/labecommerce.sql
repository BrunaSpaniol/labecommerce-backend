-- Active: 1682090122485@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT(DATETIME())
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

CREATE TABLE
    purchase (
        id TEXT UNIQUE NOT NULL PRIMARY KEY,
        total_price REAL DEFAULT (0.0) NOT NULL,
        paid INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT NOT NULL DEFAULT(DATETIME()),
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER DEFAULT (1) NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchase(id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases_products;
DROP TABLE purchase;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "2",
        "Fulana",
        "fulana@email.com",
        "fulana2001"
    ), (
        "3",
        "Ciclano",
        "ciclano@email.com",
        "ciclano99"
    ), (
        "4",
        "beltrano",
        "beltrano@email.com",
        "beltrano2022"
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "1",
        "Pão",
        4.00,
        "food",
        "image.com"
    ), (
        "2",
        "Café",
        12.00,
        "food",
        "image.com"
    ), (
        "3",
        "Manteiga",
        30.00,
        "food",
        "image.com"
    ), (
        "4",
        "Leite",
        10.00,
        "food",
        "image.com"
    ), (
        "5",
        "Queijo",
        15.00,
        "food",
        "image.com"
    );

-- createUser;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "05",
        "Bahia",
        "bahia@bahia.com.br",
        "BAÊA"
    );

--Create Product

INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "23",
        "vassoura",
        13.00,
        "cleaning",
        "image.com"
    );

--Create purchase

INSERT INTO
    purchase(
        id,
        total_price,
        paid,
        created_at,
        delivered_at,
        buyer_id
    )
VALUES (
        "1",
        50.00,
        "1",
        "29/01/2023",
        NULL,
        "2"
    ), (
        "2",
        55.00,
        "1",
        "29/01/2023",
        NULL,
        "2"
    ), (
        "3",
        30.00,
        "1",
        "29/05/2023",
        NULL,
        "3"
    ), (
        "4",
        33.00,
        1,
        "29/05/2023",
        NULL,
        "3"
    );

INSERT INTO
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES ("1", "3", 1), ("1", "4", 2), ("3", "5", 2);

-- GetAllUsers

SELECT * FROM users;

--GetAllProducts

SELECT * FROM products;

SELECT * FROM purchase;

--SearchProductByName

SELECT * FROM products WHERE name = "Manteiga";

--get all purchases

SELECT
    purchase.id AS purchase_id,
    total_price,
    paid,
    purchase.created_at AS createdPurchase,
    delivered_at,
    users.name
FROM purchase
    INNER JOIN users ON purchase.buyer_id = users.id;

SELECT
    purchase.id AS purchaseId,
    purchase.buyer_id AS buyerId,
    purchase.created_at AS purchaseCreatedAt,
    purchase.delivered_at AS deliveredAt,
    purchase.paid AS paid,
    products.id AS productId,
    products.name AS productName,
    products.description AS productCategory,
    products.image_url AS productImage,
    products.price AS productPrice,
    quantity
FROM purchases_products
    INNER JOIN purchase ON purchases_products.purchase_id = purchase.id
    INNER JOIN products ON purchases_products.product_id = products.id;

-- getProductsById

SELECT * FROM products WHERE id = "2";

-- deleteUserById

DELETE FROM users WHERE id = "4";

-- deleteProductById

DELETE FROM products WHERE id = "4";

--Edit User by id

UPDATE users SET email = "email@email.com.br" WHERE id = "4";

--Edit Product by id

UPDATE products
SET
    price = 6.00,
    description = "padaria"
WHERE id = "1";

-- Get All Users ordered by e-mail

SELECT * FROM users ORDER BY email ASC;

-- Get All Products versão 1

SELECT * FROM products ORDER BY price ASC LIMIT 20;

--Get All Products versão 2

SELECT *
FROM products
WHERE price > 10 AND price < 20
ORDER BY price ASC;

UPDATE purchase
SET
    delivered_at = datetime('now', 'localtime')
WHERE purchase.id = "1";

-- get all purchases from user_id = 2

SELECT
    purchase.id AS purchase_id,
    total_price,
    paid,
    purchase.created_at AS createdPurchase,
    delivered_at,
    users.name
FROM purchase
    INNER JOIN users ON purchase.buyer_id
WHERE users.id = "2";

SELECT * FROM purchase;