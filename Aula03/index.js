const express = require('express'); //npm install express --save 
const mongoose = require('mongoose'); //npm install mongoose --save
const dotenv = require('dotenv'); //npm install dotenv --save
const conectaDB = require('./db'); // Importando o módulo de conexão com o banco de dados
const alunosRoutes = require('./routes/alunos.routes'); // Importando as rotas de alunos

const port = 3000; // Definindo a porta do servidor


const app = express(); // Definindo a aplicação Express

app.use(express.json()); // Middleware para analisar JSON

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

// Criar uma conexão com o MongoDB
conectaDB();

app.get('/', (req, res) => {
    res.send('Hello World!'); // Rota de teste para verificar se o servidor está funcionando
});

//Rotas
app.use('/alunos', alunosRoutes); // Usando as rotas de alunos

//Handler de erros
app.use((err, req, res, next) => {
    console.error(`Erro: ${err}`);
    //CastError
    if (err.name === 'CastError') {
        return res.status(400).json({ erro: 'ID inválido' });
    }
    //Erro de validação
    if (err.name === 'ValidationError') {
        return res.status(400).json({ erro: "Validação falhou", detalhes: err.errors});
    }
    //Erro genérico
    return res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`); // Mensagem indicando que o servidor está rodando
});