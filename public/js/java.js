app.get("/download-cv", (req, res) => {
  const file = path.join(__dirname, "public/cv/Martin-CV.pdf");
  res.download(file, "Martin-CV.pdf", (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("File tidak bisa didownload");
    }
  });
});
