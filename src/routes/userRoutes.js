const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware=require("../middlewares/jwtMiddleware");
const router = express.Router();

router.post("/login", userController.loginUser,jwtMiddleware.generateToken,jwtMiddleware.sendToken);

console.log('jwtMiddleware', jwtMiddleware)
console.log("verifyToken:", typeof jwtMiddleware.verifyToken);
console.log("verifyAdmin:", typeof jwtMiddleware.verifyAdmin);
console.log("getAllUser:", typeof userController.getAllUser);

router.get("/",jwtMiddleware.verifyToken,jwtMiddleware.verifyAdmin, userController.getAllUser);




module.exports = router;