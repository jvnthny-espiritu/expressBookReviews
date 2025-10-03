const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
  // Expect the login route to have set:
  // req.session.authorization = { accessToken: <JWT>, username: <string> }

  const sessionAuth = req.session && req.session.authorization;
  const token = sessionAuth && sessionAuth.accessToken;

  if (!token) {
    return res.status(403).json({ message: "Unauthorized: token missing" });
  }

  jwt.verify(token, "access", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized: token invalid or expired" });
    }
    req.user = decoded;
    req.username = sessionAuth.username; it
    return next();
  });
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
