import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import medicine from "./medicine.js";
import auth from "./auth.js";
import user from "./user.js";
import doctor from "./doctor.js";

const router = express.Router();
const app = express();
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(
  "/api", 
router.use("/medicine", medicine), 
router.use("/auth", auth),
router.use("/user", user),
router.use("/doctor", doctor)
);

app.listen(process.env.PORT_SERVER, () => {
  console.log(`Server is running on port ${process.env.PORT_SERVER}`);
});
