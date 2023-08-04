const express = require('express');
const router = express.Router();

router.use(require('./supremeRoutes'));
router.use(require('./orderRoutes'));

module.exports = router;


