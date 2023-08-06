const express = require('express');
const router = express.Router();

router.use(require('./supremeRoutes'));
router.use(require('./orderRoutes'));
router.use(require('./witchRoutes'));

module.exports = router;


