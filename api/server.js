const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require("express-session");
const app = express();
const port = 8080;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // replace with the exact origin of your client app
    credentials: true,
  })
);

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Blockchain-Wallet", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

//middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/me", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// create user schema
const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  publicKey: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
});
const User = mongoose.model("User", userSchema);

// register route
app.post("/register", async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const user = new User({
      name: req.body.name,
      publicKey: req.body.publicKey,
      password: hashedPassword,
    });

    // save user to database
    await user.save();
    res.send("User registered successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// login route
app.post("/login", async (req, res) => {
  const { publicKey, password } = req.body;
  const user = await User.findOne({ publicKey });
  if (!user) return res.status(401).send("Invalid email or password");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send("Invalid email or password");
  const token = jwt.sign({ _id: user._id }, "secretkey");
  res.send({ token });
});

app.get("/profile", authenticateToken, (req, res) => {
  const user = req.user;
  res.json({ name: user.name, email: user.email });
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// logout endpoint
app.post("/logout", (req, res) => {
  // clear session data
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error logging out");
    } else {
      // clear token data
      delete req.headers.authorization;
      res.clearCookie("token");
      res.status(200).send("Logged out successfully");
    }
  });
});

// logout endpoint

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
