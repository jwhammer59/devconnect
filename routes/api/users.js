const express = require('express');
const router = express.Router();

// @route     GET api/users/test
// @desc      Tests users route
// @accesss   Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;
