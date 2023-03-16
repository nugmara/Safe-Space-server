const { expressjwt } = require("express-jwt");
const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload", // para permitirnos tener el payload del token para saber que usuario es el que está logeando
  getToken: (req) => {
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("usuario no tiene token");
      return null;
    }
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];
    if (tokenType !== "Bearer") {
      console.log("Tipo de token no valido");
      return null;
    }
    console.log("El token existe y tiene tipo correcto");
    return token;
  },
});

module.exports = isAuthenticated;

