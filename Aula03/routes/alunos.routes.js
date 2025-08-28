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
//GET (lista de registros)
router.get('/', async (req,res, next) => {
    try {
        const { nome } = req.query; // Extrai o parâmetro de consulta 'nome' da requisição
        const filtro = {};
        if (nome) {
            filtro.nome = new RegExp(nome, 'i'); // Adiciona um filtro para o nome, se fornecido (case-insensitive)
        }
        const alunos = await Aluno.find(filtro).sort({ createdAt: -1 });
        return res.json(alunos); // Retorna a lista de alunos como JSON

    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});
//GET (registro único)
router.get('/:id', async (req, res, next) => {
    try {
        const aluno = await Aluno.findById(req.params.id); // Busca o aluno pelo ID
        if (!aluno) {
            return res.status(404).json({ erro: 'Registro não encontrado' });
        }
        return res.json(aluno);
    } catch (error) {
        next(error);
    }
});
//UPDATE
router.put('/:id', async (req, res, next) => {
    try {
        const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!aluno) {
            return res.status(404).json({ erro: "Aluno não encontrado para update." });
        }
        return res.json(aluno);
    } catch (error) {
        next(error);
    }
});

//DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id); // Busca e deleta o aluno pelo ID
        if (!aluno) {
            return res.status(404).json({ erro: 'Registro não encontrado para exclusão' });
        }
        return res.status(204).send(); // Retorna 204 No Content se a exclusão for bem-sucedida
    } catch (error) {
        next(error);
    }
});

module.exports = router; // Exporta o roteador para ser usado em outros arquivos