# Notepad DevOps

Bloco de Notas web feito para a aula de DevOps.

# Funcionalidades

Permite que o usuário faça seu cadastro, salve e gerencie suas notas.

# Instalação

Existem dois arquivos .env no projeto. **Apenas um deles é necessário ao utilizar o Docker.**

## Requerimentos:

1. Executando via Docker:
    1. Docker
    1. Docker Compose
1. Executando sem Docker:
    1. NodeJS ^16.x
    1. MariaDB ^10.3

## Passos

1. Crie uma cópia do arquivo `.env.example` localizado na raíz do projeto, e o renomeie para `.env`.
1. Configure as variáveis de ambiente como achar necessário.

### Utilizando via Docker

1. Execute o comando abaixo na raíz do projeto:
    ```bash
    docker compose up
    ```

    O projeto irá instalar as dependências necessárias e em seguida irá subir os servidores do back e do frontend para desenvolvimento.

1. Configure o banco de dados:

    1. Utilize o comando abaixo para acessar o container do banco:
    ```bash
    docker compose exec db mysql -uroot -p
    ```

    1. Em seguida, crie o usuário especificado no arquivo `.env`, assim como o banco de dados:
    ```sql
    CREATE USER '<usuário-especificado-no-env>'@'%' IDENTIFIED BY '<senha-especificada-no-env>';
    CREATE DATABASE '<banco-especificado-no-env>';
    GRANT ALL PRIVILEGES ON '<banco-especificado-no-env>'.* TO '<usuário-especificado-no-env>'@'%';
    FLUSH PRIVILEGES;
    ```

    1. Utilize o comando abaixo para inserir as tabelas e dados para desenvolvimento no banco de dados:
    ```
    docker compose exec -unode backend npm run db:setup
    ```

    1. A aplicação está pronta para desenvolvimento.

### Utilizando sem Docker

1. Caso necessário, ajuste o arquivo `/frontend/.env` também.

1. Acesse o MariaDB:
    1. Windows:
        ```bash
        mariadb -uroot -p
        ```
    1. Linux:
        ```bash
        sudo mariadb -uroot -p
        ```

1. Em seguida, crie o usuário especificado no arquivo `.env`, assim como o banco de dados:
    ```sql
    CREATE USER '<usuário-especificado-no-env>'@'%' IDENTIFIED BY '<senha-especificada-no-env>';
    CREATE DATABASE '<banco-especificado-no-env>';
    GRANT ALL PRIVILEGES ON '<banco-especificado-no-env>'.* TO '<usuário-especificado-no-env>'@'%';
    FLUSH PRIVILEGES;
    ```

1. Abra um segundo terminal, e coloque-os nas pastas `/frontend` e `/backend`;

1. Execute o comando abaixo nos dois terminais:
    ```bash
    npm install
    ```

1. No terminal em `/backend`, utilize o comando abaixo para inserir as tabelas e dados para desenvolvimento no banco de dados:
    ```bash
    npm run db:setup
    ```

1. Agora a aplicação está pronta para desenvolvimento. Suba os servidores com os comandos abaixo:
    1. `/backend`
        ```bash
        npm run dev
        ```

    1. `/frontend`
        ```bash
        npm start
        ```

# Autores:

- Rafael Martins Trindade
- Gustavo Soares Gomes
