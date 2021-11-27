require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./src/middleware/auth");

require("./src/db/connect");

const server = require("http").createServer(app);
const options = {
  cors: {
    origins:[ "http://localhost:5500/index", "http://localhost:5500/login", "http://localhost:5500/register"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
};

const io = require("socket.io")(server, options);

let state = {
  files: [
    {
      name: "code.cpp",
      content:
        '#include <iostream>\nusing namespace std\n\nint main()\n{\n cout << "Hello World!" << endl;\n return 0;\n}',
    },
  ],
  active: 0,
  mode: "text/x-c++src",
  cursor: { ch: 0, line: 0 }
};

io.on("connection ", (socket) => {
  io.emit("broadcast", state);

  socket.on("emit", (arg) => {
    state = arg;
    socket.broadcast.emit("broadcast", state);
  });
});

const Register = require("./src/models/registers");
const static_path = path.join(__dirname, "/");
const template_path = path.join(__dirname, "/templates/views");
const partial_path = path.join(__dirname, "/templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
  res.render("home")
});

app.get("/index", auth, (req, res) => {
  // Adding `auth` as middleware
  res.render("index");
});

app.get("/logout", auth, async (req, res) => {
  try {
    // For single logout 
    req.user.tokens = req.user.tokens.filter((currentElement) => {
      return currentElement.token !== req.token;
    });

    // Logout from all devices
    // req.user.tokens = [];

    res.clearCookie("jwt");

    console.log("Logout successfully");

    await req.user.save();
    res.render("login");

  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/home", (req, res) => {
  res.render("home");
});

// Create a new user in out database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {

      const registerUser = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: password,
        confirmpassword: cpassword
      });

      // Middleware
      const token = await registerUser.generateAuthToken();

      // The res.cookie() function is used to set the cookie name to value.
      // The value parameter may be a string or object converted to JSON.
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 18000000), //18000000: expires after 5 hours
        httpOnly: true,
        // secure:true
      });

      const registered = await registerUser.save();
      res.status(201).render("index");

    } else {
      res.send("passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login validation
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    // Middleware
    const token = await useremail.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 18000000), //18000000: expires after 5 hours
      httpOnly: true,
      // secure:true
    });

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("Invalid login details");
    }

  } catch (error) {
    res.status(400).send("Invalid login details");
  }
});

let port = process.env.PORT || 5500;

server.listen(port, () => {
  console.log(`Listening to port no ${port}`);
});