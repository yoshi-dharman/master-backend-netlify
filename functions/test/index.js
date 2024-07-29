const express = require("express");
const supabase = require("./db");

const router = express.Router();

router.get("/db", async (req, res) => {
	const { data, error } = await supabase.from("wakeup").select();

	if (error) {
		return res.status(500).json(error);
	} else {
		return res.json(data[0] || {});
	}
});

router.get("", async (req, res) => {
	const { data, error } = await supabase.from("test").select();

	if (error) {
		return res.status(500).json(error);
	} else {
		return res.json(data);
	}
});

router.get("/:id", async (req, res) => {
	const { data, error } = await supabase.from("test").select().eq("id", req.params.id);

	if (error) {
		return res.status(500).json(error);
	} else {
		return res.json(data[0] || {});
	}
});

router.post("/add", async (req, res) => {
	const { error } = await supabase.from("test").insert(req.body);

	if (error) {
		return res.status(500).json(error);
	} else {
		return res.json({ success: true });
	}
});

router.put("/update/:id", async (req, res) => {
	const { error } = await supabase.from("test").update(req.body).eq("id", req.params.id);

	if (error) {
		return res.status(500).json(error);
	} else {
		return res.json({ success: true });
	}
});

router.delete("/delete/:id", async (req, res) => {
	const checkData = async () => {
		const { data, error } = await supabase.from("test").select().eq("id", req.params.id);

		if (error) {
			return res.status(400).json({
				success: false,
				message: "Error on getting data to delete",
			});
		} else {
			if (data.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Error, no data to delete / wrong id",
				});
			}
		}

		return true;
	};

	let check = await checkData();

	if (check === true) {
		const { error } = await supabase.from("test").delete().eq("id", req.params.id);

		if (error) {
			return res.status(500).json(error);
		} else {
			return res.json({ success: true });
		}
	}
});

module.exports = router;
