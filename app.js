const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/talk", (req, res) => {
    res.render("talk");
});

app.get("/detail", (req, res) => {
    res.render("detail");
});

app.get("/download-cv", (req, res) => {
    res.download(path.join(__dirname, "public/cv/Martin-CV.pdf"));
});

app.get("/myproject", (req, res) => {
    res.render("myproject"); // pastikan ada file views/myproject.hbs
});

app.get("/download-cv", (req, res) => {
  const file = path.join(__dirname, "public/cv/CV_Martin.pdf");
  res.download(file, "CV_Martin.pdf", (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("File tidak bisa didownload");
    }
  });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
