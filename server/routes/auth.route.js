const { registerM,registerP } = require("../controller/user.controller");
const router = require("express").Router();

router.post("/manuF",registerM);
router.post("/tranP",registerP);
module.exports = router;