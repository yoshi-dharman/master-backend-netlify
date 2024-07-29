const express = require("express");
const supabase = require("./db");

const router = express.Router();

router.get("/db", async (req, res) => {
	const { data, error } = await supabase.from("wakeup").select();

	if (error) {
		return res.status(500).json({
			error,
		});
	} else {
		return res.json(data[0]);
	}
});

module.exports = router;
