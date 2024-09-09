import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
//
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
//import postRoutes from "./routes/posts.js";
import propertyRoutes from "./routes/properties.js"
import budgetRoutes from "./routes/budgets.js"
import actualRoutes from "./routes/actual.js"
import misRoutes from "./routes/mis.js"

import ratingRoutes from "./routes/ratings.js"
//
import { register, changePassword } from "./controllers/auth.js";
//import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
//
// Models
//

//import Post from "./models/Post.js";
import User from "./models/User.js";
import Property from "./models/Property.js";
import Budget from "./models/Budget.js"
//import { users, posts } from "./data/index.js";
import  fs  from "fs"; 

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
//
app.enable('trust proxy')

// app.use(express.static(path.join(__dirname, 'build')));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
//app.post("/auth/register", upload.single("picture"), register);
//app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.get("/", (req, res) => {
  res.send({ message: "Hello! Welcome to Pragati MIS Backend" });
});
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
//
app.use("/auth", authRoutes);
app.post("/auth/register", register);
app.post("/auth/change",verifyToken, changePassword);
//
app.use("/property", propertyRoutes);
//
app.use("/users", userRoutes);
//app.use("/posts", postRoutes);
////////////////////////////////////////////
app.use("/budget", budgetRoutes)
app.use("/actual", actualRoutes)
app.use("/mis", misRoutes)
////////////////////////////////
app.use("/rating", ratingRoutes)



///////////////////////////////

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
//
//const client = new MongoClient(uri,{tlsCAFile: `rds-combined-ca-bundle.pem`});
//const ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //ssl: true,
    //sslValidate: true,
    //tls: true,
    //tlsCAFile: "rds-combined-ca-bundle.pem"
    //sslCA: ca
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
