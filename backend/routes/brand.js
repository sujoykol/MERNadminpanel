const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const upload = require("../middleware/brandupload");


router.get('/', brandController.getAll);
router.get('/:id', brandController.getBrandById);
router.post('/',upload.single("image"), brandController.create);
router.put('/:id',upload.single("image"), brandController.update);
router.delete('/:id', brandController.delete);

module.exports = router;