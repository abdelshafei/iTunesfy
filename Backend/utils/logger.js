function methodLogger(req, res) {
    console.log("\nMETHOD LOGGER");
    console.log("================================");
    console.log("METHOD: " + req.method);
    console.log("URL: " + req.originalUrl);
    console.log("STATUS CODE: " + res.statusCode)
    console.log("================================\n");
}


module.exports = { methodLogger };