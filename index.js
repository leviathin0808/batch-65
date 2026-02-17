const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
import multer from "multer";
const app = express();
const PORT = 3000;

// =======================
// DATABASE
// =======================
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "personal_web",
  password: "5942",
  port: 5432,
});

// TEST DB
pool.connect()
  .then(() => console.log("DATABASE CONNECTED"))
  .catch(err => console.error("DB ERROR:", err.message));

// =======================
// MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false,
}));

//multer upload//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/styles/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// =======================
// VIEW ENGINE
// =======================
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// =======================
// ROUTES
// =======================

// REGISTER PAGE
app.get("/register", (req, res) => {
  res.render("register");
});

// REGISTER PROCESS
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    console.log("USER REGISTERED:", email);
    res.redirect("/login");

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.send(err.message);
  }
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  res.render("login");
});

// LOGIN PROCESS
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.send("Email tidak ditemukan");
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.send("Password salah");
    }

    req.session.isLogin = true;
    req.session.user = user;

    res.redirect("/home");

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.send(err.message);
  }
});

// HOME
app.get("/", (req, res) => {
  res.redirect("/home");
});

// HOME (LIST PROJECT)
app.get("/home", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );
    res.render("home", { projects: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

// MY PROJECT
app.get("/myproject", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );
    res.render("myproject", { projects: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

// CONTACT
app.get("/contact", (req, res) => {
  res.render("contact");
});

// CREATE PROJECT
app.post("/home", async (req, res) => {
  const { projectName, startDate, endDate, description } = req.body;

  try {
    await pool.query(
      `INSERT INTO projects 
        (user_id, title, description, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [1, projectName, description, startDate, endDate]
    );

    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.send("Insert error");
  }
});

// DETAIL PROJECT
app.get("/home/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.send("Project tidak ditemukan");
    }

    res.render("detail", { project: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
