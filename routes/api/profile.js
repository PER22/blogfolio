const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profiles');


router.get('/:profileId', profileController.detail)
router.put('/:profileId', profileController.update);
router.delete('/:profileId', profileController.deleteProfile);


module.exports = router;