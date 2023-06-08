const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profiles');


router.get('/', profileController.detail)
router.put('/', profileController.update);
router.delete('/', profileController.deleteProfile);


module.exports = router;