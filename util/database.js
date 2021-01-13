const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node_course","root","",{dialect: "mysql", host: "localhost"});

module.exports = sequelize;