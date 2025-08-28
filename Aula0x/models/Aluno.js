//Criar um schema para Aluno
const mongoose = require('mongoose'); // Importa o mongoose
// Define o schema do Aluno
const alunoSchema = new mongoose.Schema(
    {
        nome: {// Campo nome do aluno, obrigatório
            type: String, 
            required: [true, 'Este campo é obrigatório'], // Campo nome do aluno, obrigatório com mensagem de erro personalizada
            minlength: [2, 'O nome deve ter pelo menos 2 caracteres'], // Validação para o tamanho mínimo do nome
            maxlength: [100, 'O nome deve ter no máximo 100 caracteres'] // Validação para o tamanho máximo do nome
        }, 
        idade: {// Campo idade do aluno, obrigatório
            type: Number, 
            required: [true, 'Este campo é obrigatório'], // Campo idade do aluno, obrigatório com mensagem de erro personalizada
            min: [0, 'A idade deve ser um número positivo'], // Validação para a idade mínima
            max: [150, 'A idade deve ser no máximo 150 anos'] // Validação para a idade máxima
        }, 
        curso: {// Campo curso do aluno, obrigatório
            type: String, 
            required: [true, 'Este campo é obrigatório'], // Campo curso do aluno, obrigatório com mensagem de erro personalizada
            maxlength: [120, 'O curso deve ter no máximo 120 caracteres'] // Validação para o tamanho máximo do curso
        }, 
        createdAt: {// Campo createdAt para registrar a data de criação do documento
            type: Date,
            default: Date.now // Campo createdAt para registrar a data de criação do documento, com valor padrão como a data atual
        }, 
    },
    {versionKey: false } // Desativa o campo __v que é adicionado automaticamente pelo mongoose para controle de versão do documento
);

const Aluno = mongoose.model('Aluno', alunoSchema); // Cria o modelo Aluno com o schema definido
module.exports = Aluno; // Exporta o modelo para ser usado em outros arquivos