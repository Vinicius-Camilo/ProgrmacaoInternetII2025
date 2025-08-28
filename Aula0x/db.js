const mongoose = require('mongoose');

async function conectaDB() {
    const uri = process.env.MONGODB_URI; // URI de conexão do MongoDB Atlas
    // Verifica se a URI está configurada
    if(!uri) {
       console.error('MONGODB_URI não configurada ou não encontrada.'); // Mensagem de erro se a URI não estiver configurada
       process.exit(1); // Encerra o processo se a URI não estiver configurada
    }
    mongoose.set('strictQuery', true); // Configuração para evitar avisos de consulta estrita
    try {
        await mongoose.connect(uri)
        console.log('Conectado ao MongoDB Atlas'); // Mensagem de sucesso ao conectar
    }
    catch (error) {
        console.error(`Erro ao conectar ao MongoDB Atlas: ${error}`); // Mensagem de erro ao conectar
        process.exit(1); // Encerra o processo em caso de erro
    }
}

module.exports = conectaDB // Exporta a função para ser usada em outros arquivos
