const router = require("express").Router();
const task = require("../controllers/task.controller");

router.get("/:id", task.findAll);

router.post("/create", task.create);

router.put(":/id", task.update);

router.delete("/:id", task.delete);

module.exports = router;

