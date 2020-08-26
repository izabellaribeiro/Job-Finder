// aplicação para utilizar bancos relacionais com node. 
const Sequelize = require('sequelize');

//instância do sequelize que diz qual o banco utilizado
const sequelize = new Sequelize({
    dialect: 'sqlite', 
   //apontamento do banco de dados. 
    storage: './db/app.db'
});


//exportar para serem usadas fora. 
module.exports = sequelize;