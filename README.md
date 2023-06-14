# Labecommerce Backend

Este é um projeto de uma API para gerenciamento de usuários, produtos e compras. A API utiliza o framework Express para lidar com as requisições HTTP e o banco de dados Knex para fazer consultas ao banco de dados.

## Configuração

1. Instale as dependências do projeto executando o seguinte comando:

```shell
npm install
```

2. Configure o banco de dados MySQL, criando um banco de dados e configurando as credenciais de acesso no arquivo `database/knex.js`.

3. Execute as migrações para criar as tabelas necessárias no banco de dados:

```shell
npx knex migrate:latest
```

4. Inicie o servidor executando o seguinte comando:

```shell
npm start
```

O servidor estará rodando na porta 3003.

## Endpoints

### `GET /users`

Endpoint para obter todos os usuários cadastrados. Retorna um array de objetos contendo as informações dos usuários, incluindo `id`, `name`, `email`, `password` e `createdAt`.

### `POST /users`

Endpoint para criar um novo usuário. Recebe no corpo da requisição um objeto contendo as informações do usuário, incluindo `id`, `name`, `email` e `password`. Retorna uma mensagem de sucesso caso o usuário seja criado com sucesso.

### `POST /products`

Endpoint para criar um novo produto. Recebe no corpo da requisição um objeto contendo as informações do produto, incluindo `id`, `name`, `price`, `description` e `imageUrl`. Retorna uma mensagem de sucesso caso o produto seja criado com sucesso.

### `GET /products`

Endpoint para obter todos os produtos cadastrados. Retorna um array de objetos contendo as informações dos produtos, incluindo `id`, `name`, `price`, `description` e `imageUrl`.

### `GET /product/search?q={query}`

Endpoint para pesquisar produtos por nome. Recebe um parâmetro `q` na query da requisição, que representa o termo de busca. Retorna um array de objetos contendo as informações dos produtos que correspondem à busca.

### `PUT /products/:id`

Endpoint para editar um produto existente. Recebe o ID do produto como parâmetro na URL e as novas informações do produto no corpo da requisição. Retorna uma mensagem de sucesso caso a edição seja realizada com sucesso.

### `POST /purchase`

Endpoint para criar uma nova compra. Recebe no corpo da requisição um objeto contendo as informações da compra, incluindo `id` (identificador da compra), `buyer` (ID do comprador) e `products` (um array de objetos contendo o `product_id` e a `quantity` de cada produto). Retorna uma mensagem de sucesso caso a compra seja criada com sucesso.

### `DELETE /purchase/:id`

Endpoint para excluir uma compra existente. Recebe o ID da compra como parâmetro na URL. Retorna uma mensagem de sucesso caso a compra seja excluída com sucesso.

### `GET /purchases/:id`

Endpoint para obter os detalhes de uma compra específica. Recebe o ID da compra como parâmetro na URL. Retorna um objeto contendo as informações da compra, incluindo o `purchaseId`, `buyerId`, `buyerName`, `buyerEmail`, `totalPrice`, `createdAt` e uma

.mensagem contendo um array de objetos com os detalhes de cada produto adquirido na compra.

## Considerações Finais

Este projeto fornece uma API básica para gerenciamento de usuários, produtos e compras. É um ponto de partida que pode ser expandido e aprimorado de acordo com as necessidades específicas de cada aplicação.

Sinta-se à vontade para contribuir com melhorias, reportar problemas ou enviar sugestões para o projeto.
