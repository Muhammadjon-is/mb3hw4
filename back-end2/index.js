import listEndpoints from "express-list-endpoints";
import express from "express";
import path from "path";
import multer from "multer";
import { log } from "console";

const app = express();

const port = 3001;
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "-",
      +Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const multipleUpload = upload.fields([{name:"file1",}, {name:"file2", maxCount:3 }])

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/uploadfile", multipleUpload, (req, res) => {
    if(req.files){
        console.log("Files Uploaded");
        console.log(req.files);
    }
});

app.listen(port, () => {
  console.table(listEndpoints(app));
  console.log("server listening on port: " + port);
});
