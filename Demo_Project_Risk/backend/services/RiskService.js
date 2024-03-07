const RiskDao = require('../daos/RiskDao')

class RiskService{
    async getAllRisks(){
        return await RiskDao.getAllRisks();
    }

    async getRiskById(id){
        return await RiskDao.getRiskById(id);
    }

    async createRisk(riskData){
        return await RiskDao.createRisk(riskData);
    }

    async updateRisk(id, riskData){
        return await RiskDao.updateRisk(id, riskData);
    }

    async deleteRisk(id){
        return await RiskDao.deleteRisk(id);
    }
}

module.exports = new RiskService();