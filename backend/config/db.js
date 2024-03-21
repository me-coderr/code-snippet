const mysql = require("mysql2");

const connectDB = async () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // -----------------------
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error(`Error connecting to MySQL: ${err.message}`);
          reject(err);
          return;
        }
        console.log(`MySQL connected as id ${connection.threadId}`);
        resolve(connection);
      });
    });

    return connection;
  } catch (err) {
    console.log(`\nError in createConnection : ${err}\n`);
    throw err;
  }
};

module.exports = { connectDB };
