# Blackwell Academy



## 📝 Sobre

**Blackwell Academy** é uma site de uma escola fictícia que permite cadastrar/editar/deletar alunos e professores, com seus respectivos campos de informações


---------

## 🖥️ Demonstração

<h1>
    <img src="teachers-index.png"
</h1> 

<h1>
    <img src="teachers-details.png"
</h1> 

<h1>
    <img src="students-index.png"
</h1> 

<h1>
    <img src="students-details.png"
</h1> 



----------


## 🚀 Tecnologias e ferramentas utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **NodeJS**
- **Express**
- **Nunjucks**
- **Method override**
- **PostgreSQL/Postbird**

---------
    
    
----------


##  🚧 Ainda serão adicionados:

- **Responsividade**
- **Novo layout**

---------

## 💻 Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/RodrigoFonsecaG/blackwell.git
# ou use a opção de download.

# Entre na pasta do projeto 
$ cd blackwell

# Instale as dependências
$ npm install

# Rode o aplicação
$ npm start

#Por fim acesse o localhost:3000 no seu navegador.
```
    
-----------
    
## 📦 Criação do banco de dados
Crie o banco de dados no postbird

Acesse o arquivo `db.js` em `src/config/db.js` e configure o usuário e senha de conexão com o PostgreSQL.

```js
module.exports = new Pool({
    // user: 'Usuário PostgreSQL',
    // password: 'Senha PostgreSQL',    
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
});


