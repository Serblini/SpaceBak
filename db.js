const { Sequelize } = require("sequelize");

// module.exports = new Sequelize(
//   //  process.env.POSTGRES_URL,)

module.exports = new Sequelize(
  process.env.PGDATABASE, // Название БД
  process.env.PGUSER, // Пользователь
  process.env.PGPASSWORD, // ПАРОЛЬ
  { dialectModule: require('pg'),
    dialect: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,

  }
);

module.exports
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
