const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());

const checkRouter = require("./check/index");
const testRouter = require("./test/index");
const wishRouter = require("./wish/index");
const rsvpRouter = require("./rsvp/index");

router.get("", (req, res) => {
	res.json({
		Messsage: "Main Root of Api",
		"-": "----------------------------------------------------",

		Check: "Checking for somethings",
		Check_API: { "GET - /check/db": "Check database connection" },

		"--": "----------------------------------------------------",
		Test: "Testing for backend (db Supabase)",
		Test_Model: "id (auto generate primary), text (string), create_at (auto generate date)",
		Test_API: {
			"GET - /db": "Check database connection",
			"GET - /": "Get all data",
			"GET - /:id": "Get data by id",
			"POST - /add": "Create data",
			"PUT - /update/:id": "Update data",
			"DELETE - /delete/:id": "Delete data",
		},

		"---": "----------------------------------------------------",
		Wish: "For wish wedding page",
		Wish_Model: "id (auto generate primary), name (string), wish (string), create_at (auto generate date)",
		Wish_API: {
			"GET - /db": "Check database connection",
			"GET - /": "Get all data",
			"POST - /add": "Create data",
			"DELETE - /delete/:id": "Delete data",
		},

		"----": "----------------------------------------------------",
		Rsvp: "For reservation wedding page",
		Rsvp_Model: "id (auto generate primary), guestName (string), guestCount (number), guestStatus (string), create_at (auto generate date)",
		Rsvp_API: {
			"GET - /db": "Check database connection",
			"GET - /": "Get all data",
			"POST - /add": "Create data",
			"DELETE - /delete/:id": "Delete data",
		},

		"-----": "----------------------------------------------------",
	});
});

// Split Inside Folder
router.use("/check", checkRouter);
router.use("/test", testRouter);
router.use("/wish", wishRouter);
router.use("/rsvp", rsvpRouter);

app.use("/api/", router);

module.exports.handler = serverless(app);
