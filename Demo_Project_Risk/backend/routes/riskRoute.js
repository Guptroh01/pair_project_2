const express = require('express');
const router = express.Router();

const RiskController = require('../controllers/RiskController')

router.get('/', RiskController.getAllRisks);
router.get('/:id', RiskController.getRiskById);
router.post('/', RiskController.createRisk);
router.put('/:id', RiskController.updateRisk);
router.delete('/:id', RiskController.deleteRisk);

module.exports = router;