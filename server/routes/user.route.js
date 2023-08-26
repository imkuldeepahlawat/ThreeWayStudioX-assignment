const { createOrder } = require("../controller/order.controller");
const { register, login } = require("../controller/user.controller");
const authRouter = require("./auth.route")
const router = require("express").Router();

router.post("/login",login);
router.post('/createOrder',createOrder)
router.use("/register",authRouter);
module.exports = router;