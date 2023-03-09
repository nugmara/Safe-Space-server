const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// POST "/api/auth/signup" => Registrar al usuario en la BD
router.post("/signup", async (req, res, next) => {
  const { username, firstName, lastName, image, email, password } = req.body;
  // Validación del BE
  // - Validar que los campos no estén vacíos
  if (!username || !firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "All the selectioned fields should not be empty" });
  }
  // - Validar que la contraseña sea suficientemente fuerte
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (passwordRegex.test(password) === false) {
    return res.status(400).json({
      errorMessage:
        "The password should have at least 8 chars, one uppercase, one lowercase and one special character",
    });
  }
  // - Validar que el correo electrónico tenga el formato correcto
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (emailRegex.test(email) === false) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a valid email address" });
  }
  try {
    // - Validar que el usuario no este duplicado
    const foundUsername = await User.findOne({ username: username });
    if (foundUsername !== null) {
      return res.status(400).json({ errorMessage: "Username already exists" });
    }
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail !== null) {
      return res
        .status(400)
        .json({ errorMessage: "Email address already exists" });
    }
    //encriptar la contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      image: image,
      email: email,
      password: hashPassword,
    });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/signin" => Validar las credenciales del usuario
router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;
  // Verificar que los campos no estén vacíos
  if (!username || !password) {
    return res
      .status(400)
      .json({ errorMessage: "The fields should not be empty" });
  }
  try {
    // Ver si el usuario existe en la BD
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(400).json({ errorMessage: "Not valid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ errorMessage: "Not valid credentials" });
    }
    // Sistema de sesiones donde vamos a utilizar el Token que indentifica al usuario
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => verificar si el usuario esta activo o no
router.get("/verify", isAuthenticated, (req, res, next) => {
    // console.log(req.payload);
    res.status(200).json(req.payload)
})

module.exports = router;
