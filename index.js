const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const projects = [];

app.set('view engine', 'hbs');
// supaya CSS & JS bisa dipakai
app.use(express.static(path.join(__dirname, "public")));

// routing halaman
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/myproject", (req, res) => {
  res.render("myproject");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});