const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		messages: "Hello, world!",
	});
});

app.use("/", router);

module.exports.handler = serverless(app);
