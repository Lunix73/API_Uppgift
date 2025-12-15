const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mariadb.createPool({   //Skapar pool i MariaDB
  host: 'localhost',
  user: process.env.USER,         // Användare och lösenord i .env
  password: process.env.PWD,
  database: 'industrial_products',
  port: 3306,
  connectionLimit: 10
});

app.post('/orders', async (req, res) => {     // POST-anrop - asynkron funktion
  const { product_id, order_id } = req.body;
  console.log(req.body);

  let dbConn;
  try {
  dbConn = await db.getConnection();    // Öppnar anslutning till databasen
  const rows = await dbConn.query(`INSERT INTO orders (product_id, order_id) VALUES (?, ?)`, [product_id, order_id]); // Lägger in produkt-id och beställnings-id som ny post
  res.json({ message: 'Order added successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (dbConn) dbConn.release(); // Stänger anslutningen när anropet är klart
  }
});

app.get('/orders', async (req,res) => {  // GET-anrop: hämtar alla poster. Asynkron funktion
  let dbConn;
  try {
    dbConn = await db.getConnection();  // Öppnar anslutning till databasen
    const rows = await dbConn.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (dbConn) dbConn.release(); // Stänger anslutningen när anropet är klart
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});