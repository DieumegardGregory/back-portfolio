require('dotenv').config();
const jwt = require("jsonwebtoken");
const { User } = require('../models');

// const { ACCESS_JWT_EXPIRESIN,
// ACCESS_JWT_COOKIE_MAXAGE,
// ACCESS_JWT_COOKIE_SECURE,
// REFRESH_JWT_EXPIRESIN,
// REFRESH_JWT_COOKIE_MAXAGE,
// REFRESH_JWT_COOKIE_SECURE 
// } = process.env;

const createToken = (req, res) => {
  const id = req.user.id_user;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
  // const refreshToken = jwt.sign({ id }, process.env.REFRESH_JWT, { expiresIn: "1h" });
  res
    .status(200)
    .cookie("token", token, { httpOnly: true, maxAge: 3600000, sameSite: "lax" })
    // .cookie("refresh-token", refreshToken, { httpOnly: true, maxAge: 3600000 })
    .json({ id });
};

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        res.sendStatus(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
     res.status(403).send("Unauthorized");
  }
};

const refreshToken = (req, res) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("Your JWT is unauthorized");
    }
    return res.status(400).send("Bad request");
  }

  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  console.log("seconds ?", nowUnixSeconds);

  if (payload.exp - nowUnixSeconds < 120) {
    return res.status(500).json({ token });
  }

  const newToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).cookie("token", newToken, { httpOnly: true, maxAge: 3600000 });
};

const verifyCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    // /!\ mise en place de la connexion avec le pseudo à mettre en place /!\
    const [result] = await User.findOneByEmail(email);
    // Check de si l'email existe et s'il est trouvé par son id dans la BDD
    if (result.length === 0) {
      res.status(401).send("Email or Password wrong");
    } else {
      const validPassword = await User.verifyPassword(password, result[0].password);
      if (validPassword) {
        delete result[0].password;
        const [user] = result;
        req.user = user;
        next();
      } else {
        res.status(400).send("Email or Password wrong");
      }
    }
  };
  
  // const createAccessToken = (req, res) => {
  //   const token = jwt.sign(req.user, ACCESS_JWT_SECRET, { expiresIn: ACCESS_JWT_EXPIRESIN });
  
  //   res
  //     .status(200)
  //     .cookie("token", token, {
  //       // Création du token
  //       httpOnly: true,
  //       // Uniquement disponible sous une connexion http
  //       maxAge: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
  //       // Définition de la durée du token (utilise l'unité du temps et le temps accordé dans le dotenv, défini le radix à 10 )
  //       secure: ACCESS_JWT_COOKIE_SECURE === "true",
  //       // Sécurise le cookie pour l'envoyer uniquement sur une route http (/!\ ne pas informer des informations personnel, c'est pas chiffré /!\ )
  //       sameSite: "lax",
  //       // Empêche l'envoie de cookie inter-sites
  //     })
  //     .json({ id: req.user.id, expires_in: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10) });
  // };

  // const createAccessAndRefreshToken = (req, res) => {
  //   const token = jwt.sign(req.user, ACCESS_JWT_SECRET, { expiresIn: ACCESS_JWT_EXPIRESIN });
  //   // L'acces token laisse place rapidement au refresh token
  //   const refreshToken = jwt.sign({ id: req.user.id }, REFRESH_JWT_SECRET, { expiresIn: REFRESH_JWT_EXPIRESIN });
  //   res
  //     .status(200)
  //     .cookie("token", token, {
  //       httpOnly: true,
  //       maxAge: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
  //       secure: ACCESS_JWT_COOKIE_SECURE === "true",
  //       sameSite: "lax",
  //     })
  //     .cookie("refresh_token", refreshToken, {
  //       httpOnly: true,
  //       maxAge: parseInt(REFRESH_JWT_COOKIE_MAXAGE, 10),
  //       secure: REFRESH_JWT_COOKIE_SECURE === "true",
  //       sameSite: "lax",
  //     })
  //     .json({ id: req.user.id_user, role: req.user.role, expires_in: 0.5 * 60 });
  // };

module.exports = {
  createToken,
  verifyToken,
  refreshToken,
  verifyCredentials,
  // createAccessToken,
  // createAccessAndRefreshToken,
};