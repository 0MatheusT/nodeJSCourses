function midImported(req, res, next) {
  console.log("Authenticating...")

  next();
}

module.exports = midImported;