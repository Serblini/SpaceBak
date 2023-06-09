const { Sequelize } = require("sequelize");

// module.exports = new Sequelize(
//   //  process.env.POSTGRES_URL,)

module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  { dialectModule: require('pg'),
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
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
