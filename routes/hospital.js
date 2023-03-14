const express = require('express');
const router = express.Router();

const {getHospital, getHospitals, createHospital, updateHospitals, deleteHospitals} = require('../controllers/hospital');
const appointmentRouter = require('./appointment');
const {protect, authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);

router.route('/').get(getHospitals).post(protect, authorize("admin"), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize("admin"), updateHospitals).delete(protect,authorize("admin"), deleteHospitals);

module.exports=router;