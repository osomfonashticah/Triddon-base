const Pool = require("pg").Pool;

// DB connection
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

//Route Handlers
exports.getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.getUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID:${results.rows[0].id}`);
    }
  );
};

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name=$1,email=$2 WHERE id =$3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID:${id}`);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID:${id}`);
  });
};
