const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const upload = require("../middleware/sliderupload");

router.get('/', sliderController.getAll);
router.get('/:id', sliderController.getBrandById);
router.post('/',upload.single("image"), sliderController.create);
router.put('/:id',upload.single("image"), sliderController.update);
router.delete('/:id', sliderController.delete);



module.exports = router;