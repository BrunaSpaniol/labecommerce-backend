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

-- GetAllUsers

SELECT * FROM users;

--GetAllProducts

SELECT * FROM products;

--SearchProductByName

SELECT * FROM products WHERE name = 'Manteiga';

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
SELECT * FROM products
WHERE price > 10 AND price < 20
ORDER BY price ASC;