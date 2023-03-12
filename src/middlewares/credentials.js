const whitelist = [
  "http://localhost:5173",
  "https://todo-app-six-peach.vercel.app",
];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
