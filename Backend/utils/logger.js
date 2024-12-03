function methodLogger(req, res) {
    console.log("\nMETHOD LOGGER");
    console.log("================================");
    console.log("METHOD: " + req.method);
    console.log("URL: " + req.originalUrl);
    console.log("RESPONSE: " + res);
    console.log("================================\n");
}


module.exports = { methodLogger };