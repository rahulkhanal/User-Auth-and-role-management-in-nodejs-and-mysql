const con = require("../Databases/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: (req, resp) => {
    const { name, email, role } = req.body;
    const password = bcrypt.hashSync(req.body.password);

    con.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
      if (err) {
        resp.json({
          status: 500,
          messege: "Error occured while finding existing data in database",
          err: err,
        });
      } else {
        con.query(
          `INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)`,
          [name, email, password, role],
          (err, res) => {
            if (err) {
              resp.json({
                status: 500,
                messege: "Error occured while inserting into database",
                err: err,
              });
            } else {
              console.log("Inserted");
              resp.json({
                status: 200,
                messege: "Successfully inserted into database",
                err: "none",
              });
            }
          }
        );
      }
    });
  },
  login: (req, resp) => {
    const { username, password } = req.body;
    console.log(req.body);
    con.query(`SELECT * FROM users WHERE email = ?`, [username], (err, res) => {
      if (err) {
        resp.json({
          status: 500,
          messege: "Error occured while getting data from database",
          err: err,
        });
      }
      if (res.length == 0) {
        resp.json({
          status: 404,
          messege: "Look like no user is found",
          err: err,
        });
      } else {
        let validatation = bcrypt.compareSync(password, res[0].password);
        if (validatation) {
          const token = jwt.sign({ username }, "secret_key", {
            expiresIn: "1h",
          });
          // resp.json({ token });
          resp.cookie("token", token, { maxAge: 10000, httpOnly: true });
          resp.redirect("/api/about");
        } else {
          resp.json({
            status: "404",
            msg: "Password is not valid",
          });
        }
      }
    });
  },
};
