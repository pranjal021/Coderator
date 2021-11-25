require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
require("./src/db/connect");

const server = require("http").createServer(app);
const options = {
  cors: {
    origins: "*",
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

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
  res.render("home")
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

app.get("/views/login", (req, res) => {
  res.render("login");
});

app.get("/views/register", (req, res) => {
  res.render("register");
});

app.get("/views/home", (req, res) => {
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

      const token = await registerUser.generateAuthToken();

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