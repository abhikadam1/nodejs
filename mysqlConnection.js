const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
// MySQL Connection
const db = mysql.createConnection({  
	host : 'ecovisrkca-rmt-com.cdeky8oy4qrz.ap-south-1.rds.amazonaws.com',
	user : 'echo_rmt_user',
	password : 'rmt^1998#ucode',
	database : 'forensic_audit',
	// dbdriver : 'mysqli',
  // host: "127.0.0.1",
  // port: 3307,
  // user: "root",
  // password: "",
  // database: "laravel_app_database",
});
// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM bank_master", (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    return res.json(results);
  });
});

// Create a new user
app.post("/api/users", async (req, res) => {
  let { username, email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?",[email],async (err, results) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        res.status(500).send("Error creating user");
        return;
      }
      if (results.length > 0) {
        return res.status(400).json({
          error: "Email already exists",
        });
      } else {
        password = await bcryptjs.hash(password, 12);

        db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[username, email, password],(err, result) => {
            if (err) {
              console.error("Error executing query: " + err.stack);
              res.status(400).send("Error creating user");
              return;
            }
            console.log(result.insertId, " result ");
            res.status(201).json({
                mag : "User created successfully"
            });
          }
        );
      }
    }
  );
});

// Update an existing user
app.put("/api/users/:id", (req, res) => {
    const { username, email } = req.body;
    const userId = req.params.id;
    
    console.log(req.body, userId, "  user id");
  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [username, email, userId],
    (err, result) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        res.status(400).send("Error updating user");
        return;
      }
      res.send("User updated successfully");
    }
  );
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(400).send("Error deleting user");
      return;
    }
    console.log(result, "delete result ");
    
    res.send("User deleted successfully");
  });
});
