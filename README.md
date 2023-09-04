# Cloudflare Worker

Este é um exemplo de um Cloudflare Worker que lida com visualizações de página usando um banco de dados D1 e uma lógica de validação.

## Pré-requisitos

- Node.js

## Configuração

1. Clone este repositório:
2. Crie um worker e banco de dados D1:

   ```
   npm create cloudflare@latest
   ```

   ```
   wrangler d1 create <DATABASE_NAME>
   ```

3. Configure seu ambiente para incluir o banco de dados que foi criado:

   Edite o arquivo wrangler.toml

4. Execute o script de teste, dev ou deploy descrito no package.json

## Uso

O worker lida com visualizações de página usando uma URL no seguinte formato:

```
http://127.0.0.1:{porta}/pageview/:key
```
Ou
```
https://sua-url.com/pageview/:key
```

- `:key`: Uma chave de página que você deseja rastrear as visualizações.

## Funcionalidades

- O worker verifica se a chave da página é válida antes de processar a solicitação.
- Ele consulta o banco de dados para obter o número atual de visualizações da página.
- Ele incrementa o contador de visualizações no banco de dados a cada solicitação bem-sucedida.

## Estrutura do Projeto

- `src/worker.ts`: O código principal do worker.
- `src/database/core.ts`: Funções para interagir com o banco de dados.
- `src/utils/validator.ts`: Funções para validar chaves de página.
- `src/utils/faker.ts`: Funções para gerar dados para teste.

