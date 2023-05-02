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

SELECT * FROM users;

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

SELECT * FROM products;

INSERT INTO
    products (id, name, price, category)
VALUES (1, "Pão", 4.00, "food"), (2, "Café", 12.00, "food"), (3, "Manteiga", 30.00, "food"), (4, "Leite", 10.00, "food"), (5, "Queijo", 15.00, "food");

UPDATE users SET email = 'email@email.com.br' WHERE id = "4";

UPDATE products
SET
    price = 6.00,
    category = "padaria"
WHERE id = 1;

DELETE FROM products WHERE id = 4;