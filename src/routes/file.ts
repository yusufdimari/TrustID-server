import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const middleWare = multer({ storage: storage });

router.post("/", middleWare.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    success: true,
  });
});

export default router;
