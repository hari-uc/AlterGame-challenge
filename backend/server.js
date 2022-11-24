require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true,

});

app.use(limiter);


const router = require("./routes/index");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static("public"));

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

app.listen(port, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`);
});
