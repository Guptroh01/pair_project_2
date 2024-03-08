const RiskService = require('../services/RiskService')

class RiskController{

    async getAllRisks(req, res) {
        try {
            const risks = await RiskService.getAllRisks();
            res.json(risks);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getRiskById(req, res) {
        const {id} = req.params;
        try {
            const risks = await RiskService.getRiskById(id);
            res.json(risks);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async createRisk(req, res) {
        const riskData = req.body;
        try {
            riskData.risks = riskData.risks.split(',').map(risk => risk.trim());
            riskData.hazards = riskData.hazards.split(',').map(hazard => hazard.trim());
            riskData.barriers = riskData.barriers.split(',').map(barriers => barriers.trim());
            const risk = await RiskService.createRisk(riskData);
            res.status(201).json(risk)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    async updateRisk(req, res) {
        const {id} = req.params;
        const riskData = req.body;
        try {
            
           const updatedRisk = await RiskService.updateRisk(id, riskData);
           if(!updatedRisk) 
           {
            return res.status(404).json({error: 'Risk Not Found'}); 
           }
           res.json(updatedRisk);
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    async deleteRisk(req, res){
        const {id} = req.params;
        try {
            const deletedRisk = await RiskService.deleteRisk(id);
            if(!deletedRisk){
                return res.status(400).json({error: 'Risk not found'});
            } 
            res.json(deletedRisk);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new RiskController();