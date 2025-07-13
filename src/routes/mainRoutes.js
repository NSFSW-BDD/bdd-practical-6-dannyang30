const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categoryRoutes');
const furnitureRoutes = require('./furnitureRoutes');
const userRoutes = require('./userRoutes');

router.use("/category", categoryRoutes);
// router.use("/furniture", furnitureRoutes);
router.use("/user", userRoutes);

module.exports = router;