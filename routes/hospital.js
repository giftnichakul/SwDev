const express = require('express');
const router = express.Router();

const {getHospital, getHospitals, createHospital, updateHospitals, deleteHospitals} = require('../controllers/hospital');
const {protect, authorize} = require('../middleware/auth');

router.route('/').get(getHospitals).post(protect, authorize("admin"), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize("admin"), updateHospitals).delete(protect,authorize("admin"), deleteHospitals);

module.exports=router;