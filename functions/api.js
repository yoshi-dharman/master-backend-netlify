const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
app.use(express.json());

const checkRouter = require("./check/index");
const testRouter = require("./test/index");

router.get("", (req, res) => {
	res.json({
		Messsage: "Main Root of Api",
		"-": "----------------------------------------------------",

		Check: "Checking for somethings",
		"/check/db": "Check database connection",

		"-": "----------------------------------------------------",
		Test: "Testing for backend (db Supabase)",
		Model: "id (auto generate primary), text (string), create_at (auto generate date)",
		"/db": "Check database connection",
		"/": "Get all data",
		"/:id": "Get data by id",
		"/update/:id": "Update data",
		"/delete/:id": "Delete data",
	});
});

// Split Inside Folder
router.use("/check", checkRouter);
router.use("/test", testRouter);

app.use("/api/", router);

module.exports.handler = serverless(app);
