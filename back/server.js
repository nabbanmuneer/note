const express = require("express");
const mysql = require('mysql2');

const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require("./config/corsOption");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*****",
  database: 'table'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

});


connection.query(`
CREATE TABLE IF NOT EXISTS table (
  id INT(11) NOT NULL AUTO_INCREMENT,
  note VARCHAR(2000) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`, (error, results, fields) => {
  if (error) {
    console.error('Error creating table:', error);
    return;
  }
  console.log('Table created successfully.');
});
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM table', (err, results, fields) => {
    if (err) {
      console.error('Error retrieving data from database: ' + err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(results);
  });
});

app.delete('/delete',(req,res)=>{
  let {id}= req.body;
  connection.query(`DELETE FROM  table  WHERE id = ${idToDelete}`);
})


app.post('/insert', (req, res) => {
  const { note } = req.body;
  if (!note) {
    res.status(400).send('Missing name, value, or text parameter');
    return;
  }
  connection.query('INSERT INTO table (note, createdAt) VALUES (?, NOW())', [note], (err, results, fields) => {
    if (err) {
      console.error('Error inserting data into database: ' + err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    res.send('Data inserted into new_table');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
