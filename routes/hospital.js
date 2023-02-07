const express = require('express');
const router = express.Router();

const {getHospital, getHospitals, createHospital, updateHospitals, deleteHospitals} = require('../controllers/hospital');

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospitals).delete(deleteHospitals);

module.exports=router;