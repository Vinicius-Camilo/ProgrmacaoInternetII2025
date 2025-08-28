//Criar as rotas do CRUD
// /routes/alunos.routes.js

const express = require('express'); // Importa o express
const Aluno = require('../models/Aluno'); // Importa o modelo Aluno

const router = express.Router(); // Cria um roteador Express

//POST
router.post('/', async (req, res, next) => {
    try {
        const aluno = await Aluno.create(req.body); // Cria um novo aluno com os dados do corpo da requisição
        return res.status(201).json(aluno); // Retorna o aluno criado com status 201 (sucesso)
    } catch (error) {
        next(error); //Criar a rota de interceptação 
    }
});
//GET


//UPDATE

//DELETE

module.exports = router; // Exporta o roteador para ser usado em outros arquivos