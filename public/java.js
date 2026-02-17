// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = 3000;

// // middleware body parser
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // static files
// app.use(express.static(path.join(__dirname, "public")));

// // view engine
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views"));

// // dummy data
// const projects = [];

// // routes
// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.get("/myproject", (req, res) => {
//   res.render("myproject", { projects });
// });

// app.post("/myproject", (req, res) => {
//   const { projectName, startDate, endDate, description } = req.body;

//   projects.push({
//     id: projects.length + 1,
//     projectName,
//     startDate,
//     endDate,
//     description,
//   });

//   res.redirect("/myproject");
// });

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
