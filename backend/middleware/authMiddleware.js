const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:");
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "No Token"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:");
    console.log(token);

    try {

        const decoded = jwt.verify(
            token,
            "thecadcompany_secret"
        );

        console.log("Decoded:");
        console.log(decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("JWT Error:");
        console.log(err.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};

module.exports = verifyToken;