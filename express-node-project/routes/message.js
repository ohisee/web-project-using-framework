const express = require('express');
const router = express.Router();

/**
 * Sub route of /message defined in app.js
 */
router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'See this message'
  });
});

module.exports = router;
