// routes/test.js
import { Router } from "express";
import  auth  from "../middlewares/Auth.js";

const r = Router();

r.get("/me", auth, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user   // ye user data JWT se aa rha hai
  });
});

export default r;
