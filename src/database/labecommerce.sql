-- Active: 1682090122485@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

CREATE TABLE
    purchase(
        id TEXT UNIQUE NOT NULL PRIMARY KEY,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        created_at TEXT,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        2,
        "Fulana",
        "fulana@email.com",
        "fulana2001"
    ), (
        3,
        "Ciclano",
        "ciclano@email.com",
        "ciclano99"
    ), (
        4,
        "beltrano",
        "beltrano@email.com",
        "beltrano2022"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (1, "Pão", 4.00, "food"), (2, "Café", 12.00, "food"), (3, "Manteiga", 30.00, "food"), (4, "Leite", 10.00, "food"), (5, "Queijo", 15.00, "food");

-- createUser;

INSERT INTO
    users (id, name, email, password)
VALUES (
        '05',
        'Bahia',
        'bahia@bahia.com.br',
        'BAÊA'
    );

--Create Product

INSERT INTO
    products(id, name, price, category)
VALUES (
        '23',
        'vassoura',
        13.00,
        'cleaning'
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
        '1',
        '50.00',
        '1',
        '29/01/2023',
        NULL,
        '2'
    ), (
        '2',
        '55.00',
        '1',
        '29/01/2023',
        NULL,
        '2'
    ), (
        '3',
        '30.00',
        '1',
        '29/05/2023',
        NULL,
        '3'
    ), (
        '4',
        '33.00',
        '1',
        '29/05/2023',
        NULL,
        '3'
    );

-- GetAllUsers

SELECT * FROM users;

--GetAllProducts

SELECT * FROM products;

SELECT * FROM purchase;

--SearchProductByName

SELECT * FROM products WHERE name = 'Manteiga';

--get all purchases

SELECT
    purchase.id AS purchase_id,
    total_price,
    paid,
    created_at,
    users.id
FROM purchase
    INNER JOIN users ON purchase.buyer_id = users.id;

-- getProductsById

SELECT * FROM products WHERE id = '2';

-- deleteUserById

DELETE FROM users WHERE id = 4;

-- deleteProductById

DELETE FROM products WHERE id = 4;

--Edit User by id

UPDATE users SET email = 'email@email.com.br' WHERE id = "4";

--Edit Product by id

UPDATE products
SET
    price = 6.00,
    category = "padaria"
WHERE id = 1;

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
    delivered_at = datetime('now')
WHERE purchase.id = 1;

SELECT * FROM purchase WHERE user.id = '1';

-- get all purchases from user_id = 2
SELECT
    purchase.id AS purchase_id,
    total_price,
    paid,
    created_at,
    delivered_at,
    users.name
FROM purchase
    INNER JOIN users ON purchase.buyer_id
WHERE users.id = '2';