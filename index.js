const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*const db = mariadb.createPool({
  host: 'localhost',
  user: 'linus',
  password: 'q1swcd',
  database: 'industrial_products',
  port: 3306,
  connectionLimit: 5
});*/
const db = mariadb.createPool({
  host: 'localhost',
  user: 'linus',
  password: 'q1swcd',
  database: 'industrial_products',
  port: 3306,
  connectionLimit: 10
});
/*async function asyncFunction() {
let dbConn = await db.getConnection();
const tables = await dbConn.query("SHOW COLUMNS FROM orders");
console.log(tables);
}
asyncFunction();*/
/*db.getConnection((err) => {
  if (err) {
    console.error('Connection error', err);
    return;
  }
  console.log('Connected to database!');
});*/



/*var varor;*/
app.post('/orders', async (req, res) => {
  const { product_id, order_id } = req.body;
  console.log(req.body);

  let dbConn;
  try {
  dbConn = await db.getConnection();
  const rows = await dbConn.query(`INSERT INTO orders (product_id, order_id) VALUES (?, ?)`, [product_id, order_id]);
  res.json({ message: 'Order added successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (dbConn) dbConn.release();
  }
});

app.get('/orders', async (req,res) => {
  let dbConn;
  try {
    dbConn = await db.getConnection();
    const rows = await dbConn.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (dbConn) dbConn.release();
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'linus', 
     password: 'q1swcd',
     database: 'test17',
     connectionLimit: 5
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	/*const res = await conn.query("INSERT INTO Varor value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.end();
  }
}
asyncFunction().then(() => {
  pool.end();
});*/